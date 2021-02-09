var userModule = require('../modules/user.module.js');
const session = require('express-session');

/* Get User data */
const userGet = (req, res) => {
    // return res.send('respond with a resourcdddde');
    userModule.getUsersList()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            return res.send(err);
        });
}

/* Post User data */
const userPost = (req, res) => {
    const insertData = req.body;
    userModule.createUser(insertData)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            return res.send(err);
        })
}

/* User Login Check */
const userLogin = (req, res) => {
    const insertData = req.body;
    // res.setHeader('Set-Cookie', 'isLoggedIn=true');
    userModule.loginCheck(insertData)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        return res.send(err);
    })
}

// export default {
//     userGet,
// };


module.exports = {
    userGet,
    userPost,
    userLogin,
};