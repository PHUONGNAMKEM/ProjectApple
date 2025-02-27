const connection = require("../config/database");

const getAllUsers = async () => {
    let [results, fields] = await connection.query('select * from users');
    return results;
}

const getUserById = async (userId) => {
    let [results, fields] = await connection.query('Select * from users where id = ?', [userId]);
    let user = results && results.length > 0 ? results[0] : {}; // ở đây chúng ta cần phải handle trừ khi trường hợp người dùng nhập bừa tham số id vào route hoặc là khi đang sửa thì có người xóa mất user đó nên nó ko còn tồn tại

    return user;
}

const updateUserById = async (fullname, email, password, phone, address, userId) => {
    let [results, fields] = await connection.query(
        `UPDATE users 
        SET fullname  = ?, email = ?, password = ?, phone = ?, address = ?
        where id = ?`, [fullname, email, password, phone, address, userId]
    );
}

const deleteUserById = async (userId) => {
    await connection.query('DELETE FROM users WHERE id = ?', [userId]);
}

module.exports = {
    getAllUsers, getUserById, updateUserById, deleteUserById
}