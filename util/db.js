import mysql from "mysql2/promise";

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "mysql-374c1fbb-mdc-rp.h.aivencloud.com",
    database: "defaultdb",
    user: "avnadmin",
    password: "AVNS_biDYk7NR2j9gi7NNTG1",
    port: 14756
});

export const query = async (sql, params) => {
    const rows = (await pool.query(sql, params));
    return rows;
};

export default pool;