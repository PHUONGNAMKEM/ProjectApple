require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const mongoose = require('mongoose');

const connection = require("./config/database");

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// config req.body
app.use(express.json()); // json và urlencoded đều là những gì mà ở client yêu cầu đến server (ở 2 dạng là json trong ajax chẳng hạn và urlencoded là dl từ form)
app.use(express.urlencoded({ extended: true })); // khi bên client gửi đi thì express sẽ chuyển đổi nó thành js để có thể sử dụng được, extended:true cho phép sdung thư viện qs để phân tích cú pháp phức tạp - KHI SỬ DỤNG NHƯ NÀY THÌ BÊN SERVER SẼ SỬ DỤNG ĐƯỢC MỘT BIẾN REQ.BODY

// config template engine
configViewEngine(app);

// khai báo route
app.use("/", webRoutes);

const kittySchema = new mongoose.Schema({
  name: String
}); // ở đây định nghĩa một Schema là một cấu trúc xác định cách dữ liệu sẽ được lưu trữ trong MongoDB

const Kitten = mongoose.model('Kitten', kittySchema); // mongoose.model ở đây giúp tạo ra một model dựa trên Schema vừa định nghĩa
// 'Kitten' ở đây sẽ liên kết với 1 collection trong mongodb tên là kittens (mongoose sẽ tự viết thường và thêm s vào)
// ta có thể dùng model này Kitten để tạo, truy vấn CRUD vs csdl - cầu nối giữa code JS với MongoDB
const cat = new Kitten({ name: 'iFanIT\'s cat' }); // Tạo một instance (đối tượng) mới của model Kitten với dữ liệu cụ thể: { name: 'Silence' } tên là cat
cat.save(); // lưu cat xuống db với giá trị của cột name là Silence
// xong tất cả thì nó sẽ tạo một db test ở dưới mongodb

// đây là cách sử dụng arrow function không cần đặt tên trước - self-running function - giúp chúng ta không cần gọi
// hàm 1 cách thủ công nữa mà hàm sẽ tự động chạy khi dùng self-running function
(async () => {
  // test connection
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`My Apple Project app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();

