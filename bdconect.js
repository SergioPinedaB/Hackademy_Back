const mysql =require('mysql');

function testconnection(){
    conection.connect((error) => {
        if (error) throw error;
        console.log("Database Conected");
      });
}

module.exports = () => {
    mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
      });
  }

  