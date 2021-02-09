var userModule = require('../modules/user.module.js');
var cookieParser = require('cookie-parser');
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
    console.log('QQQQQ insert Data', insertData)
    res.cookie('try', 'try', {path: '/'});
    userModule.loginCheck(insertData)
    .then((result) => {
        res.cookie('try', 'try', {path: '/'});
        // console.log('what is res', res.cookies.try)
        res.send(result);
    })
    .catch((err) => {
        res.send(err);
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