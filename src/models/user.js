const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // UNIQUE như SQL
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' }

}); // ở đây định nghĩa một Schema là một cấu trúc xác định cách dữ liệu sẽ được lưu trữ trong MongoDB

const User = mongoose.model('user', userSchema); // mongoose.model ở đây giúp tạo ra một model dựa trên Schema vừa định nghĩa
// 'Kitten' ở đây sẽ liên kết với 1 collection trong mongodb tên là kittens (mongoose sẽ tự viết thường và thêm s vào)
// ta có thể dùng model này Kitten/User để tạo, truy vấn CRUD vs csdl - cầu nối giữa code JS với MongoDB


module.exports = User;