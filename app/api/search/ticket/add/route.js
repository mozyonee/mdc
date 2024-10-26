import { NextResponse } from "next/server";
import util from "util";
import db from "../../../../../util/db";

const query = util.promisify(db.query).bind(db);

const handler = async (req, response) => {
	const data = await req.json();
	try {
		let type;
		switch(data.target) {
			case "person": type = 0; break;
			case "vehicle": type = 1; break;
			case "house": type = 2; break;
			case "business": type = 3; break;
		}
		
		await query(`INSERT INTO tickets(type, fined, officer, reason, price, date) VALUES ('${type}', '${data.fined}', '${data.officer}', '${data.reason}', '${data.price}', '${data.date}')`);
		
		response = (await query(`SELECT * FROM tickets WHERE fined = '${data.fined}'`));

		console.log(response);

		if(response) return NextResponse.json({ message: response }, { status: 200 });
		else return NextResponse.json({ error: "Not found." }, { status: 404 });
	} catch(error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export {handler as GET, handler as POST};