var userModule = require('../modules/user.module.js');

/* Get User data */
const userGet = (req, res) => {
    // return res.send('respond with a resourcdddde');
    userModule.selectUsers()
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
            console.log('in controller');
            res.send(result);
        })
        .catch((err) => {
            return res.send(err)
        })
}

// export default {
//     userGet,
// };


module.exports = {
    userGet,
    userPost,
};