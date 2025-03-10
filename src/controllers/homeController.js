const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById, deleteUserByIdAjax } = require('../services/CRUDService');

const User = require("../models/user");

const getHomePage = async (req, res) => {
    let results = await User.find({});
    return res.render('home.ejs', {listUsers: results}); // giá trị trước dấu : là giá trị truyền qua view còn sau dấu : là gtri muốn gán cho biến trước dấu :
}

const getAPI = (req, res) => {
    res.send('<h1 style="color:red; text-align:center">Call API</h1>');
}

const getIFanIT = (req, res) => {
    res.render('sample.ejs');
}

const postCreateUser = async (req, res) => {

    let {fullname, email, password, phone, address, role} = req.body; // tên biến trùng với object muốn lấy : tên tự đặt
    // ví dụ: const obj = { name: "Nguyen Van A", mail: "a@example.com" };
    // let { name: fullName, mail: emailAddress } = obj; // fullName là tên biến tự đặt để dùng
    // console.log(fullName);      // "Nguyen Van A" // nếu trùng nhau thì viết object destructuring

    // cách dùng object destructuring
    await User.create({
        fullname,
        email,
        password,
        phone,
        address,
    });

    // cách 2 create document
    // const usertest = new User({fullname, email, password, phone, address });
    // await usertest.save();

    // res.send('Created a user successfully!');
    res.redirect('/');

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
    // let user = await getUserById(userId);
    // có một lưu ý cho chúng ta khi dùng exec đó là những hàm như find(), findOne(), findById() thì thg sẽ có .exec()
    // vì các hàm này sẽ trả về một query object tức là nó chưa cần phải query trực tiếp xuống nên cần exec để rõ ràng hơn - còn nếu các hàm như updateOne(), deleteOne(), create() thì nó trả về một Promise nên không cần .exec()
    let user = await User.findById(userId).exec();
    res.render('edit.ejs', {userEdit: user});
}

const postUpdateUser = async (req, res) => {

    let {fullname, email, password, phone, address, role} = req.body;
    let userId = req.body.userId;

    // await updateUserById(fullname, email, password, phone, address, userId);
    // ở đây nó dùng 2 object, 1 là dkien tìm kiếm document cần cập nhật, 2 là dl mới cần cập nhật
    await User.updateOne({_id: userId}, {fullname: fullname, email: email, password: password, phone: phone, address});

    res.redirect('/');
}

const postDeleteUser = async (req, res) => { // hàm này tương ứng với route /delete-user/:id để lấy user theo id hiển thị lên form confirm delete
    const userId = req.params.id;
    // let user = await getUserById(userId);
    let user = await User.findById(userId).exec();
    res.render('delete.ejs', { userDelete: user});
}

const postHandleRemoveUser = async (req, res) => {
    let userId = req.body.userId;
    // await deleteUserById(userId);
    await User.deleteOne({
        _id: userId
    });
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