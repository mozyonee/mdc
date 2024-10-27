// util/db.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    connectionLimit: 20,
    host: "mysql-374c1fbb-mdc-rp.h.aivencloud.com",
    database: "defaultdb",
    user: "avnadmin",
    password: "AVNS_biDYk7NR2j9gi7NNTG1",
    port: 14756,
    connectTimeout: 10000
});

export const query = async (sql, params) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(sql, params);
        return rows; // Return rows from the query
    } catch (error) {
        console.error("Database query error:", error);
        throw error; // Rethrow error after logging
    } finally {
        connection.release(); // Always release connection back to pool
    }
};

export default pool;
