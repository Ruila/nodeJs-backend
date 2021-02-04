var mysql = require('mysql')

var connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nodeJs_pratice',
  port: '8889'
})

connect.connect(function(err){
  if(err){
    console.log('connect error');
    return;
  }
})

// **Get User data
const getUsers = () => {

}