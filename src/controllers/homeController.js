const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById, deleteUserByIdAjax } = require('../services/CRUDService');

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
    // res.redirect('/');
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

const getUpdateUser = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserById(userId);
    res.render('edit.ejs', {userEdit: user});
}

const postUpdateUser = async (req, res) => {

    let {fullname, email, password, phone, address, role} = req.body;
    let userId = req.body.userId;

    await updateUserById(fullname, email, password, phone, address, userId);

    res.redirect('/');
}

const postDeleteUser = async (req, res) => { // hàm này tương ứng với route /delete-user/:id để lấy user theo id hiển thị lên form confirm delete
    const userId = req.params.id;
    let user = await getUserById(userId);
    res.render('delete.ejs', { userDelete: user});
}

const postHandleRemoveUser = async (req, res) => {
    let userId = req.body.userId;

    await deleteUserById(userId);
    res.redirect('/');
}

const postDeletAjaxUser_post = async (req, res) => {
    let userId = req.body.userId;
    await deleteUserByIdAjax(userId);
    // res.redirect('/');
    res.json({ success: true });
}

const postDeletAjaxUser_delete = async (req, res) => {
    let userId = req.params.id;
    await deleteUserByIdAjax(userId);
    // res.redirect('/'); nếu dùng thằng này thì khi ajax nhận phản hồi từ server nó ko biết xử lý direct nên ko cập nhật giao diện
    res.json({ success: true });
}

module.exports = {
    getHomePage,
    getAPI,
    getIFanIT,
    postCreateUser,
    getCreateUser,
    getUpdateUser,
    postUpdateUser, 
    postDeleteUser,
    postHandleRemoveUser,
    postDeletAjaxUser_post,
    postDeletAjaxUser_delete
}