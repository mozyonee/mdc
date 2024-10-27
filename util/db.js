import mysql from "mysql2";

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "mysql-374c1fbb-mdc-rp.h.aivencloud.com",
    database: "defaultdb",
    user: "avnadmin",
    password: "AVNS_biDYk7NR2j9gi7NNTG1",
    port: 14756
});

export default pool;