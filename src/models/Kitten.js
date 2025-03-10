const mongoose = require('mongoose');

const kittySchema = new mongoose.Schema({
    name: String
}); // ở đây định nghĩa một Schema là một cấu trúc xác định cách dữ liệu sẽ được lưu trữ trong MongoDB

const Kitten = mongoose.model('Kitten', kittySchema); // mongoose.model ở đây giúp tạo ra một model dựa trên Schema vừa định nghĩa
// 'Kitten' ở đây sẽ liên kết với 1 collection trong mongodb tên là kittens (mongoose sẽ tự viết thường và thêm s vào)
// ta có thể dùng model này Kitten để tạo, truy vấn CRUD vs csdl - cầu nối giữa code JS với MongoDB


module.exports = Kitten;