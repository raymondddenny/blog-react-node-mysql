import mysql2 from "mysql2";

export const db = mysql2.createConnection({
  host: "127.0.0.1",
  user: "your_mysql_user",
  password: "your_mysql_password",
  database: "blog",
});
