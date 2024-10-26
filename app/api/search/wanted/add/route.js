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
		
		await query(`INSERT INTO wanted(type, wanted, officer, reason, jail, date) VALUES ('${type}', '${data.wanted}', '${data.officer}', '${data.reason}', '${data.jail}', '${data.date}')`);
		
		response = (await query(`SELECT * FROM wanted WHERE wanted = '${data.wanted}'`));

		console.log(response);

		if(response) return NextResponse.json({ message: response }, { status: 200 });
		else return NextResponse.json({ error: "Not found." }, { status: 404 });
	} catch(error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export {handler as GET, handler as POST};