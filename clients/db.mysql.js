import mysql from 'mysql2';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'to_do_list'
};

const connection = mysql.createConnection(dbConfig);

export default connection.promise()