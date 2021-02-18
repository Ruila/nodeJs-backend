var userModule = require('../modules/user.module.js');
const session = require('express-session');

/* Get User profile data */
const userProfile = (req, res) => {
    const insertData = req.body;
    userModule.getProfile(insertData)
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
        console.log('in controller result', result)
        if(result.text === 'succeed') {
            res.cookie('user', JSON.stringify(result), {path: '/'});
        }
        req.session.username = 'ggggggg'
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
    userProfile,
    userPost,
    userLogin,
};