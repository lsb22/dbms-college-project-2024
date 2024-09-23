import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ling@mysql24",
  database: "school_management",
});

export default db;
