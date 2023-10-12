import mysql from "mysql2/promise";
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'OrionDB',
});

export {
    connection
}

/*
    jeito de rodar uma query livre de SQL injection
*/
// await connection.promise().query(sql, [nome]);