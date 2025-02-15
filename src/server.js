require('dotenv').config();
const express = require('express')
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');

const connection = require('./config/database');

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// config req.body
app.use(express.json()); // json và urlencoded đều là những gì mà ở client yêu cầu đến server (ở 2 dạng là json trong ajax chẳng hạn và urlencoded là dl từ form)
app.use(express.urlencoded({ extended: true })); // khi bên client gửi đi thì express sẽ chuyển đổi nó thành js để có thể sử dụng được, extended:true cho phép sdung thư viện qs để phân tích cú pháp phức tạp - KHI SỬ DỤNG NHƯ NÀY THÌ BÊN SERVER SẼ SỬ DỤNG ĐƯỢC MỘT BIẾN REQ.BODY

// config template engine
configViewEngine(app);

// khai báo route
app.use('/', webRoutes);

// test connection 

// Query 


app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})