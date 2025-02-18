require('dotenv').config();
const mysql = require('mysql2/promise');

// Create the connection to database
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT, // điều này là cần thiết bởi vì nếu ta không chỉ định thì nó sẽ chạy mặc định trên cổng 3306 đã có bên docker -> lỗi
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD, // nếu không chỉ định password thì nó sẽ default password là rỗng (đăng nhập ko cần password)
//     database: process.env.DB_NAME
// });

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // điều này là cần thiết bởi vì nếu ta không chỉ định thì nó sẽ chạy mặc định trên cổng 3306 đã có bên docker -> lỗi
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // nếu không chỉ định password thì nó sẽ default password là rỗng (đăng nhập ko cần password)
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;