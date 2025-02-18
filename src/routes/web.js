const express = require('express')
const router = express.Router()
const {getHomePage, getAPI, getIFanIT, postCreateUser, getCreateUser} = require('../controllers/homeController');

// route.Method('/route', handler_callbackfunction)

router.get('/', getHomePage);
router.get('/api', getAPI);
router.get('/iFanIT', getIFanIT);
router.get('/create', getCreateUser);


router.post('/create-user', postCreateUser);

module.exports = router;