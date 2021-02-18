var crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var myPassword = 'password';
var myHash ='';


var mysql = require('mysql');
const {
  connect
} = require('../config/express');

const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nodeJs_pratice',
  port: '8889'
});


/*  Get User Profile */
const getProfile = (insertData) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        reject(err); //return err if it fail to connect
      } else if (bcrypt.compareSync(myPassword, insertData.token)) { //check token hashed from password
        connection.query(`SELECT * FROM profile WHERE u_id = ?`, insertData.userid, (error, result) => {
          let obj = {};
          if (error) {
            console.error('SQL error', error)
            reject(error)
          } else if (Object.keys(result).length === 0) {
            obj = {
              message: "failed",
              text: "尚未建立個人資料",
            }
            resolve(obj)
          } else {
            obj = {
              message: "succeed",
              content: result[0],
            }
            resolve(obj)
          }
        })
      } else {
        console.log('check encrypy', insertData, myHash, myPassword)
      }
    })
  });
}

/* Add new User */
const createUser = (insertData) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(`SELECT * FROM account WHERE email = ?`, insertData.email, (error, result) => {
          if (error) {
            console.error('SQL error', error)
            reject(error)
          } else if (Object.keys(result).length === 1) {
            resolve('此信箱已註冊過！')
          } else {
            connection.query(`INSERT INTO account SET ?`, insertData, (err, res) => {
              if (err) {
                console.error('SQL error', err)
                reject(error)
              } else {
                console.log('What to include in result', res)
                // resolve(`post successfully userid: ${result}`);
                resolve('succeed to create your account')
              }
              connection.release();
            })
          }
        })
      }
    })
  })
}

/* check whether the User exist */
const loginCheck = (insertData) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(`SELECT * FROM account WHERE email = ?`, insertData.email, (error, result) => {
          if (error) {
            console.error('SQL error', error)
            reject(error)
          } else if (Object.keys(result).length === 0) {
            resolve('信箱尚未註冊！')
          } else {
            console.log('What to include in result', result)
            if (result[0].password === insertData.password) {

              // encryption
              myPassword = result[0].password;
              myHash = bcrypt.hashSync(myPassword, saltRounds)
              const obj = {
                text: 'succeed',
                userid: result[0].userid,
                email: result[0].email,
                // token: crypto.createHash('md5').update(`${result[0]}`).digest('hex')
                token: myHash
              }
              resolve(obj);
            } else {
              resolve('password error');
            }
          }
          connection.release();
        })
      }
    })
  })
}

module.exports = {
  getProfile,
  createUser,
  loginCheck,
};