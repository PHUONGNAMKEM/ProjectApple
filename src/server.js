require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const connection = require("./config/database");
const fileUpload = require('express-fileupload');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;


// config file upload
// default options
app.use(fileUpload());
// ở đây thì mình có thể chọn loại file, giới hạn size of file - và lý do mà mình để fileupload ở đây là vì nếu như khai báo nó sau app.use mà dùng middleware của Routes thì khi request đi qua route thì nó sẽ ngưng truy cập tới các middleware bên dưới (như là fileupload) cho nên nếu ta để middleware fileupload ở trước route thì ta không thể dùng biến req.files ở trong route vì lúc này nó chưa có giá trị -> biến req.files lúc này sẽ là undefined 


app.use(cors({
  origin: "http://localhost:3000", // Cho phép frontend truy cập
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// const customer = require("./models/customer.js"); // lưu ý rằng là ở đây nếu khai báo trong file server.js thì nó sẽ tự động tạo collection bên mongodb

// config req.body
app.use(express.json()); // json và urlencoded đều là những gì mà ở client yêu cầu đến server (ở 2 dạng là json trong ajax chẳng hạn và urlencoded là dl từ form)
app.use(express.urlencoded({ extended: true })); // khi bên client gửi đi thì express sẽ chuyển đổi nó thành js để có thể sử dụng được, extended:true cho phép sdung thư viện qs để phân tích cú pháp phức tạp - KHI SỬ DỤNG NHƯ NÀY THÌ BÊN SERVER SẼ SỬ DỤNG ĐƯỢC MỘT BIẾN REQ.BODY

// config template engine
configViewEngine(app);

// khai báo route
app.use("/", webRoutes);
app.use("/v1/api/", apiRoutes);

// const cat = new User({ name: 'iFanIT\'s model' }); // Tạo một instance (đối tượng) mới của model Kitten với dữ liệu cụ thể: { name: 'Silence' } tên là cat
// cat.save(); // lưu cat xuống db với giá trị của cột name là Silence
// // xong tất cả thì nó sẽ tạo một db test ở dưới mongodb

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

// // Chỉ chạy app.listen() nếu không phải Vercel
// if (!process.env.VERCEL) {
//   (async () => {
//     try {
//       await connection();
//       app.listen(port, hostname, () => {
//         console.log(`My Apple Project app listening on port ${port}`);
//       });
//     } catch (error) {
//       console.log(">>> Error connect to DB: ", error);
//     }
//   })();
// }

// // Xuất app để dùng trong vercel-entry.js
module.exports = app;
