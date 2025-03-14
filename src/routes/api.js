const express = require('express')
const routerAPI = express.Router()
const { getUsersApi } = require('../controllers/apiController');

routerAPI.get('/', (req, res) => {
    res.send("Hello API");
});

routerAPI.get('/abc', (req, res) => {
    res.status(200).json({
        data: 'hello world with api - ABC' // ở đây .json() giúp mình truyền theo dạng object trong JS - nhưng khi client nhận được thì express sẽ chuyển object thành JSON
    });
});

routerAPI.get('/users', getUsersApi);

module.exports = routerAPI;