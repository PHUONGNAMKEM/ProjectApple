const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    imgPath: { type: String },
    title: { type: String },
    description: { type: String },
    githubLink: { type: String, required: true },
    demoLink: { type: String, required: true },

    // imgPath: reactNativeImg,
    // title: "React Native Basic",
    // description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    // githubLink: "https://hoidanit.vn/khoa-hoc/react-native-ultimate-phat-trien-ung-dung-mobile-66e7ab4578aaf477418cb538.html",
    // demoLink: "https://hoidanit.vn/khoa-hoc/react-native-ultimate-phat-trien-ung-dung-mobile-66e7ab4578aaf477418cb538.html"

}, { timestamps: true }); // ở đây định nghĩa một Schema là một cấu trúc xác định cách dữ liệu sẽ được lưu trữ trong MongoDB

const Project = mongoose.model('project', projectSchema); // mongoose.model ở đây giúp tạo ra một model dựa trên Schema vừa định nghĩa
// 'Kitten' ở đây sẽ liên kết với 1 collection trong mongodb tên là kittens (mongoose sẽ tự viết thường và thêm s vào)
// ta có thể dùng model này Kitten để tạo, truy vấn CRUD vs csdl - cầu nối giữa code JS với MongoDB


module.exports = Project;