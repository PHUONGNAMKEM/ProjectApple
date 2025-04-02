const express = require('express')
const routerAPI = express.Router()
const { getUsersAPI, postCreateUsersAPI, putUpdateUserAPI, deleteUserAPI, postUploadSingleFileApi, getProjectsAPI } = require('../controllers/apiController');

// .json() giúp mình truyền theo dạng object trong JS - nhưng khi client nhận được thì express sẽ chuyển object thành JSON
//  res. cái gì đó thì nó chỉ nhận về .json(), .send() hoặc .end() - còn ko thì nó sẽ quay 10 vòng trái đất

routerAPI.get('/users', getUsersAPI);

routerAPI.post('/users', postCreateUsersAPI);

routerAPI.put('/users', putUpdateUserAPI);

routerAPI.delete('/users', deleteUserAPI);

routerAPI.post('/file', postUploadSingleFileApi); // ở đây lưu ý phải là method post - nếu để là method get (method get ko gửi kèm data lên server) thì nó biến req.files của chúng ta là undefined


routerAPI.get('/projects', getProjectsAPI);




module.exports = routerAPI;