// util/db.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
	connectionLimit: 20,
	host: process.env.DB_HOST,
	database: process.env.DB_DATA,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	port: 3306,
	connectTimeout: 10000
});

export const query = async (sql, params) => {
	const connection = await pool.getConnection();
	try {
		const [rows] = await connection.query(sql, params);
		return rows;
	} catch (error) {
		console.error("Database query error:", error);
		throw error;
	} finally {
		connection.release();
	}
};

export default pool;
