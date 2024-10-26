const mysql = require("mysql");

const pool = mysql.createPool({
	connectionLimit: 1000,
	host: "mysql-374c1fbb-mdc-rp.h.aivencloud.com",
	database: "defaultdb",
	user: "avnadmin",
	password: "AVNS_biDYk7NR2j9gi7NNTG1"
});

export default pool;