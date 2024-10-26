import { NextResponse } from "next/server";
import util from "util";
import db from "../../../../../util/db";

const query = util.promisify(db.query).bind(db);

const handler = async (req, response) => {
	const data = await req.json();
	try {
		
		await query(`DELETE FROM wanted WHERE id = '${data.id}'`);
		
		response = (await query(`SELECT * FROM wanted WHERE wanted = '${data.wanted}'`));

		console.log(response);

		if(response) return NextResponse.json({ message: response }, { status: 200 });
		else return NextResponse.json({ error: "Not found." }, { status: 404 });
	} catch(error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export {handler as GET, handler as POST};