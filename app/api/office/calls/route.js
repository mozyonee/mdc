import { NextResponse } from "next/server";
import util from "util";
import db from "../../../../util/db";

const query = util.promisify(db.query).bind(db);

const handler = async (req, response) => {
	try {
		response = await db.query(`SELECT * FROM calls`);
		if(response) return NextResponse.json({ message: response[0] }, { status: 200 });
		else return NextResponse.json({ error: "Not found." }, { status: 404 });
	} catch(error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export {handler as GET};