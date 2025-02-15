const connection = require('../config/database');

const getHomePage = (req, res) => {
    // res.status(404).send('Not Found');
    // res.json({ message: 'Hello World!' });

    // let users = [];
    // // get data here
    // connection.query(
    //     'SELECT * FROM products p',
    //     function(err, results, fields) {
    //         users = results;
    //         console.log(">>> check results home page=", results);

    //         // console.log(">>> check user =", users);
    //         res.send(JSON.stringify(users));
    //     }
    // );

    return res.render('home.ejs');
}

const getAPI = (req, res) => {
    res.send('<h1 style="color:red; text-align:center">Call API</h1>');
}

const getIFanIT = (req, res) => {
    res.render('sample.ejs');
}

const postCreateUser = (req, res) => {
    //console.log('>>> check req.body', req.body);
    // let fullname = req.body.fullname;
    // let email = req.body.email;
    // let password = req.body.password;
    // let phone = req.body.phone;
    // let address = req.body.address;
    // let role = req.body.role;

    let {fullname, email, password, phone, address, role} = req.body;

    console.log('fullname = ', fullname, 'email = ', email, 'password = ', password, 'phone = ', phone, 'address = ', address, 'role = ', role);

    connection.query(
        `INSERT INTO users (fullname, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)`, [fullname, email, password, phone, address, role],
        function(err, result) {
            console.log(result);

            res.send('Created a user successfully!');
        }
    );
}

module.exports = {
    getHomePage,
    getAPI,
    getIFanIT,
    postCreateUser
}