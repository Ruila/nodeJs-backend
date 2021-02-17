var crypto = require('crypto');
var md5 = crypto.createHash('md5');
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


/*  Get User data */
const getUsersList = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        reject(err); //return err if it fail to connect
      } else {
        connection.query(`SELECT * FROM account`, (error, result) => {
          if (error) {
            console.error('SQL error', error);
            reject(error);
          } else {
            // console.log('What to include in result', result)
            resolve(result);
          }
          connection.release();
        });
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
            // resolve(`post successfully userid: ${result}`);
            // resolve(result)
            console.log('result.password', result[0].password, insertData)
            if (result[0].password === insertData.password) {
              resolve({
                text: 'succeed',
                userid: result[0].userid,
                email: result[0].email,
                token: md5.update(`${result[0]}`).digest('hex')
              });
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
  getUsersList,
  createUser,
  loginCheck,
};