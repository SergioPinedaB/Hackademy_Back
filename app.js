require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const morgan = require("morgan");

// SERVER SETUP
const port = process.env.PORT || 3030;
// app.set('app_name', "Api Runners")
const app = express();
app.use(express.json());
app.use(morgan("dev"));

// const conection = require('C:/EjerciciosHackademy/BackHack/bdconect.js');

// DB connection MySql
const conection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// // test connection
// conection.connect((error) => {
//     if (error) throw error;
//     console.log("Database Conected");
//   });

//routes
app.get("/", (req, res) => {
  res.send("Welcom");
});


//all runners 
app.get("/api/runners", (req, res) => {
  const sql = 'SELECT name_runner,email,km FROM runner';
  conection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else res.send("Not Result");
  });
});


//runner by id
app.get("/api/runners/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT name_runner,email,km FROM runner where id=${id};`;
  conection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else res.send("Not Result");
  });
});


// add new runner
app.post("/api/add_runners", (req, res) => {
  const sql = "INSERT INTO runner set ?";
  const runnerobj = {
    name_runner: req.body.name,
    email: req.body.email,
    km: req.body.km,
  };

  if (req.body.km >= 4) {
    conection.query(sql, runnerobj, (error) => {
      if (error) throw error;
      else
        res.json({
          success: true,
          status: "Runner ADD",
        });
    });
  } else  res.send("Debes de caminar más");
  
});




app.use(express.static("public"));
app.listen(port, () => console.log(`Server runing on port ${port}`));
