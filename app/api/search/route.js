import { NextResponse } from "next/server";
import util from "util";
import db from "../../../util/db";

const query = util.promisify(db.query).bind(db);

const handler = async (req, response) => {
	const data = await req.json();
	try {
		switch(data.target) {
			case "person": {
				response = (await query(`SELECT cID, Name, cAge, cSex, cEthnos, cSkin, TLicCar, TLicAir, TLicBoat, TLicWeapon, house FROM characters WHERE Name = '${data.filter}' LIMIT 1`))[0];
				response.tickets = await query(`SELECT * FROM tickets WHERE fined = '${response.cID}'`);
				response.wanted = await query(`SELECT * FROM wanted WHERE wanted = '${response.cID}'`);
				response.vehicle = await query(`SELECT number FROM cars WHERE owner = '${response.Name}'`);
				break;
			}
			case "vehicle": {
				response = (await query(`SELECT id, owner, model, number, color_one, color_two FROM cars WHERE number = '${data.filter}' LIMIT 1`))[0];
				response.tickets = await query(`SELECT * FROM tickets WHERE fined = '${response.id}'`);
				response.wanted = await query(`SELECT * FROM wanted WHERE wanted = '${response.id}'`);
				break;
			}
			case "house": {
				response = (await query(`SELECT id, ownerid, price, x, y, z FROM houses WHERE ID = '${data.filter}' LIMIT 1`))[0];
				let ownername = (await query(`SELECT Name FROM characters WHERE cID = '${response.ownerid}' LIMIT 1`))[0];
				if(ownername) response.owner = ownername.Name;
				response.tickets = await query(`SELECT * FROM tickets WHERE fined = '${response.id}'`);
				response.wanted = await query(`SELECT * FROM wanted WHERE wanted = '${response.id}'`);

				break;
			}
			case "business": {
				response = (await query(`SELECT ID, Owner, Name, Type, Price, X, Y, Z FROM business_new WHERE ID = '${data.filter}' LIMIT 1`))[0];
				response.tickets = await query(`SELECT * FROM tickets WHERE fined = '${response.ID}'`);
				response.wanted = await query(`SELECT * FROM wanted WHERE wanted = '${response.ID}'`);
				let ownername = (await query(`SELECT Name FROM characters WHERE cID = '${response.Owner}' LIMIT 1`))[0];
				if(ownername) response.owner = ownername.Name;
				break;
			}
			default: {
				return NextResponse.json({ error: "Wrong target." }, { status: 400 });
			}
		}
		if(response) {
			response.searched = data.target;
			return NextResponse.json({ message: response }, { status: 200 });
		} else return NextResponse.json({ error: "Not found." }, { status: 404 });
	} catch(error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export {handler as GET, handler as POST};