const connection = require('../config/database');
const { getAllUsers } = require('../services/CRUDService');

const getHomePage = async (req, res) => {
    // res.status(404).send('Not Found');
    // res.json({ message: 'Hello World!' });

    let results = await getAllUsers();
    return res.render('home.ejs', {listUsers: results}); // giá trị trước dấu : là giá trị truyền qua view còn sau dấu : là gtri muốn gán cho biến trước dấu :
}

const getAPI = (req, res) => {
    res.send('<h1 style="color:red; text-align:center">Call API</h1>');
}

const getIFanIT = (req, res) => {
    res.render('sample.ejs');
}

const postCreateUser = async (req, res) => {

    let {fullname, email, password, phone, address, role} = req.body;

    console.log('fullname = ', fullname, 'email = ', email, 'password = ', password, 'phone = ', phone, 'address = ', address, 'role = ', role);

    // connection.query(
    //     `INSERT INTO users (fullname, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)`, [fullname, email, password, phone, address, role],
    //     function(err, result) {  ko cần function này nữa, đây là cách dùng callback, bị bất đồng bộ
    //         console.log(result);
    //         res.send('Created a user successfully!');
    //     }
    // );

    // hàm execute trả về cho mình một cái mảng nên mình sẽ khai báo [rows, fields] - bên file database đã sửa lại thành mysql/promise để dùng async-await
    // const [results, fields] = await connection.query('SELECT * FROM users');

    let [results, fields] = await connection.query(
        `INSERT INTO users (fullname, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)`, [fullname, email, password, phone, address, role]
    );

    res.send('Created a user successfully!');
}

const getCreateUser = (req, res) => {
    // connection.query(
    //     `SELECT * FROM users`,
    //     function(err, result) {
    //         res.send('Done!');
    //     }
    // );
    res.render('create.ejs');
}

module.exports = {
    getHomePage,
    getAPI,
    getIFanIT,
    postCreateUser,
    getCreateUser
}