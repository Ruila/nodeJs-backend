var mysql = require('mysql');
const { connect } = require('../config/express');

const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nodeJs_pratice',
  port: '8889'
});


/*  Get User data */
const selectUsers = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        reject(err); //return err if it fail to connect
      } else {
        connection.query(`SELECT * FROM account`, (error, result) => {
          if(error) {
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
      if(err) {
        reject(err); 
      } else {
        connection.query(`INSERT INTO account SET ?`, insertData, (error, result) => {
          if(error) {
            console.error('SQL error', error)
            reject(error)
          } else {
            console.log('What to include in result', result)
            // resolve(`post successfully userid: ${result}`);
            resolve(result)
          }
          connection.release();
        })
      }
    })
  })
}

module.exports = {
  selectUsers,
  createUser,
};