import mysql from "mysql2/promise";

export async function query({query, values = []}) {
	const connects = await mysql.createConnection({
		host: "mysql-374c1fbb-mdc-rp.h.aivencloud.com",
		database: "defaultdb",
		user: "avnadmin",
		password: "AVNS_biDYk7NR2j9gi7NNTG1",
		socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
	});

	try {
		const [results] = await connects.execute(query, values);
		connects.end();
		
		return results;
	} catch(error) {
		throw new Error(error.message);
	}
}