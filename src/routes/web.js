const express = require('express')
const router = express.Router()
const {getHomePage, getAPI, getIFanIT, postCreateUser} = require('../controllers/homeController');

// route.Method('/route', handler_callbackfunction)

router.get('/', getHomePage);

router.get('/api', getAPI);

router.get('/iFanIT', getIFanIT);

router.post('/create-user', postCreateUser);

module.exports = router;