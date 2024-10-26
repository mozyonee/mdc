import { NextResponse } from "next/server";
import util from 'util';
import db from '../../../../util/db';

const query = util.promisify(db.query).bind(db);

const handler = async (req) => {
    try {
        const queryString = `SELECT cID, Name FROM characters WHERE FracDuty = '1' AND pMember = '2'`;
        const results = await query(queryString);
        
        if (results.length > 0) {
            return NextResponse.json({ message: results }, { status: 200 });
        } else {
            return NextResponse.json({ error: "No characters found." }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export { handler as GET };
