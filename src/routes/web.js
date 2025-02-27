const express = require('express')
const router = express.Router()
const {getHomePage, getAPI, getIFanIT, postCreateUser, getCreateUser, getUpdateUser, postUpdateUser, postDeleteUser,
    postHandleRemoveUser
} = require('../controllers/homeController');

// route.Method('/route', handler_callbackfunction)

router.get('/', getHomePage);
router.get('/api', getAPI);
router.get('/iFanIT', getIFanIT);
router.get('/create', getCreateUser); // form trống để điền mới user 
router.get('/update/:id', getUpdateUser); // tham số sau dấu : (id) ở đây là một tham số truyền động qua bên home controller thì nó dùng chính biến id đó để truy cập trong req.params."id"


router.post('/create-user', postCreateUser); // khi điền thông tin xong từ form bấm save với method POST và route /create-user thì nó sẽ vào route này
router.post('/update-user', postUpdateUser); // khi điền thông tin xong từ form bấm save với method POST và route /update-user thì nó sẽ vào route này
router.post('/delete-user/:id', postDeleteUser); // khi điền thông tin xong từ form bấm save với method POST và route /delete-user kèm theo id thì nó sẽ vào route này
router.post('/delete-user', postHandleRemoveUser); // khi điền thông tin xong từ form bấm save với method POST và route /delete-user thì nó sẽ vào route này

module.exports = router;