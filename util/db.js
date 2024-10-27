import mysql from "mysql2/promise";

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "mysql-374c1fbb-mdc-rp.h.aivencloud.com",
    database: "defaultdb",
    user: "avnadmin",
    password: "AVNS_biDYk7NR2j9gi7NNTG1",
    port: 14756
});

// Function to test connection
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connection successful");
        connection.release(); // Release the connection back to the pool
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};

// Call the test connection function
testConnection();

export const query = async (sql, params) => {
    const [rows] = await pool.query(sql, params);
    return rows;
};

export default pool;
