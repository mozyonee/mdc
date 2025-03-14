import { NextResponse } from "next/server";
import db from "../../../util/db"; // Adjust the path as necessary

const handler = async (req) => {
	const data = await req.json();

	try {
		let response;

		switch (data.target) {
			case "person": {
				response = (await db.query(`SELECT cID, Name, cAge, cSex, cEthnos, cSkin, TLicCar, TLicAir, TLicBoat, TLicWeapon, house FROM characters WHERE Name = ? LIMIT 1`, [data.filter]))[0][0];
				if (response) {
					response.tickets = (await db.query(`SELECT * FROM tickets WHERE fined = ${response.cID}`))[0];
					response.wanted = (await db.query(`SELECT * FROM wanted WHERE wanted = ${response.cID}`))[0];
					response.vehicle = (await db.query(`SELECT number FROM cars WHERE owner = ?`, [response.Name]))[0];
				}
				break;
			}
			case "vehicle": {
				response = (await db.query(`SELECT id, owner, model, number, color_one, color_two FROM cars WHERE number = ? LIMIT 1`, [data.filter]))[0][0];
				if (response) {
					response.tickets = (await db.query(`SELECT * FROM tickets WHERE fined = ?`, [response.id]))[0];
					response.wanted = (await db.query(`SELECT * FROM wanted WHERE wanted = ?`, [response.id]))[0];
				}
				break;
			}
			case "house": {
				response = (await db.query(`SELECT id, ownerid, price, x, y, z FROM houses WHERE ID = ? LIMIT 1`, [data.filter]))[0][0];
				if (response) {
					const ownername = (await db.query(`SELECT Name FROM characters WHERE cID = ? LIMIT 1`, [response.ownerid]))[0];
					if (ownername[0]) response.owner = ownername[0].Name;
					response.tickets = (await db.query(`SELECT * FROM tickets WHERE fined = ?`, [response.id]))[0];
					response.wanted = (await db.query(`SELECT * FROM wanted WHERE wanted = ?`, [response.id]))[0];
				}
				break;
			}
			case "business": {
				response = (await db.query(`SELECT ID, Owner, Name, Type, Price, X, Y, Z FROM business_new WHERE ID = ? LIMIT 1`, [data.filter]))[0][0];
				if (response) {
					response.tickets = (await db.query(`SELECT * FROM tickets WHERE fined = ?`, [response.ID]))[0];
					response.wanted = (await db.query(`SELECT * FROM wanted WHERE wanted = ?`, [response.ID]))[0];
					const ownername = (await db.query(`SELECT Name FROM characters WHERE cID = ? LIMIT 1`, [response.Owner]))[0];
					if (ownername[0]) response.owner = ownername[0].Name;
				}
				break;
			}
			default: {
				return NextResponse.json({ error: "Wrong target." }, { status: 400 });
			}
		}

		if (response) {
			response.searched = data.target;

			console.log("response:", response);
			return NextResponse.json({ message: response }, { status: 200 });
		} else {
			return NextResponse.json({ error: "Not found." }, { status: 404 });
		}
	} catch (error) {
		console.error("Error in handler:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};

export { handler as GET, handler as POST };
