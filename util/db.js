import mysql from 'mysql2/promise';

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	connectTimeout: 10000
});

export async function query(sql, values = []) {
	try {
		const [rows] = await pool.execute(sql, values);
		return rows;
	} catch (error) {
		console.error('Database query error:', error);
		throw error;
	}
}

export default pool;
