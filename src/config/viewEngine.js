const path = require('path');
const express = require('express')

const configViewEngine = (app) => {
    // app.set('views', path.join(__dirname, '../views')); // chỉ định folder chứa các view cần thiết, không sử dụng đường dẫn tương đối để tránh sai đường dẫn -> tuyệt đối
    app.set('views', path.join('./src', 'views')); 
    app.set('view engine', 'ejs')

    // config static files
    app.use(express.static(path.join('./src', 'public')))
}

module.exports = configViewEngine;