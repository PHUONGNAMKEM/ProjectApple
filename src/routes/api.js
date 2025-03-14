const express = require('express')
const routerAPI = express.Router()
const { getUsersAPI, postCreateUsersAPI, putUpdateUserAPI, deleteUserAPI } = require('../controllers/apiController');

// .json() giúp mình truyền theo dạng object trong JS - nhưng khi client nhận được thì express sẽ chuyển object thành JSON
//  res. cái gì đó thì nó chỉ nhận về .json(), .send() hoặc .end() - còn ko thì nó sẽ quay 10 vòng trái đất

routerAPI.get('/users', getUsersAPI);

routerAPI.post('/users', postCreateUsersAPI);

routerAPI.put('/users', putUpdateUserAPI);

routerAPI.delete('/users', deleteUserAPI);


module.exports = routerAPI;