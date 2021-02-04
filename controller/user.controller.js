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

// export default {
//     userGet,
// };


module.exports = {
    userGet,
};