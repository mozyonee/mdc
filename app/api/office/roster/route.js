// File: /app/api/office/roster/route.js
import { NextResponse } from 'next/server';
import db from '../../../../util/db'; // Ensure the path is correct

export async function GET(req) {
    try {
        // Fetch characters
        const queryString = `SELECT cID, Name, pMember, pRank FROM characters WHERE FracDuty = '1' AND pMember = '2'`;
        const results = await db.query(queryString); // Expecting results[0] to contain the data
        console.log("results", results[0]); // Log the actual data

        // Fetch ranks
        const query2 = `SELECT Name, fID FROM faction_ranks WHERE Faction = '2'`;
        const results2 = await db.query(query2);
        console.log("results2", results2[0]); // Log the actual data

        // Create a rank map based on results2
        const rankMap = results2[0].reduce((map, rank) => {
            map[rank.fID] = rank.Name; // Map fID to Name
            return map;
        }, {});
        console.log("rankMap", rankMap);

        // Update results with correct rank
        const updatedResults = results[0].map(character => ({
            ...character,
            Rank: rankMap[character.pRank] || "Unknown" // Use "Unknown" if rank not found
        }));

        console.log("updatedResults", updatedResults);

        // Respond with results
        if (updatedResults.length > 0) {
            return NextResponse.json({ message: updatedResults }, { status: 200 });
        } else {
            return NextResponse.json({ error: "No characters found." }, { status: 404 });
        }
    } catch (error) {
        console.error("Error in GET /api/office/roster:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
