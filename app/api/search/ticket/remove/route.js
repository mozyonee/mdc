import { NextResponse } from "next/server";
import db from "../../../../../util/db";


const handler = async (req, response) => {
	const data = await req.json();
	
	try {
		await db.query(`DELETE FROM tickets WHERE id = '${data.id}'`);
		
		response = (await db.query(`SELECT * FROM tickets WHERE fined = '${data.fined}'`))[0];

		if(response) return NextResponse.json({ message: response }, { status: 200 });
		else return NextResponse.json({ error: "Not found." }, { status: 404 });
	} catch(error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export {handler as GET, handler as POST};