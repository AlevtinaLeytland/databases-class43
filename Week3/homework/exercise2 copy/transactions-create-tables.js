const express = require("express");
const app = express();
const mySql = require("mysql");

const connection = mySql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transactions",
});

const queryDatabase = (params, res) => {
  connection.query(params, (error, result) => {
    if (error) {
      res.send("Error occured");
      console.log(error);
    }
    console.log(result);
    res.send(result);
  });
};

app.get("/createDB", (req, res) => {
  const query = `CREATE DATABASE IF NOT EXISTS transactions`;
  queryDatabase(query, res);
});

app.get("/createAccountTable", (req, res) => {
  const query = `CREATE TABLE IF NOT EXISTS account (
    account_number INT AUTO_INCREMENT,
    balance FLOAT,
    PRIMARY KEY (account_number)
  )`;
  queryDatabase(query, res);
});

app.get("/createAccountChangesTable", (req, res) => {
  const query = `CREATE TABLE IF NOT EXISTS account_changes (
    change_number INT AUTO_INCREMENT,
    account_id INT,
    amount DECIMAL(10,2),
    changed_date DATETIME,
    remark VARCHAR(255),
    PRIMARY KEY (change_number),
    FOREIGN KEY (account_id) REFERENCES account (account_number)
  )`;
  queryDatabase(query, res);
});

// app.get("/addAutoIncrementValue", (req, res) => {
//   const query = `ALTER TABLE account_changes AUTO_INCREMENT=100`;
//   queryDatabase(query, res);
// });

app.get("/addAutoIncrementValueAccount", (req, res) => {
  const query = `ALTER TABLE account AUTO_INCREMENT=100`;
  queryDatabase(query, res);
});

app.listen(3000, (req, res) => {
  console.log("Server started");
});
