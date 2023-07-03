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

app.get("/insertAccountValues", (req, res) => {
  const query = `INSERT INTO account (balance) VALUES ("234.55"), ("3428.43"), ("10009.23")`;
  queryDatabase(query, res);
});

app.get("/insertAccountChangeValues", (req, res) => {
  const query = `INSERT INTO account_changes (amount, changed_date, remark) 
  VALUES ("101.00", "2023-03-11", "Gift to a friend"), ("1555.00", "2023-04-22", "Payment for lessons"),
  ("645.00", "2023-05-16", "Taxes")`;
  queryDatabase(query, res);
});

app.listen(3000, (req, res) => {
  console.log("Server started");
});
