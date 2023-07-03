const express = require("express");
const app = express();
const mySql = require("mysql");

const connection = mySql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transactions",
});

function queryDatabase(res, params) {
  connection.query(params, (error, result) => {
    if (error) {
      return connection.rollback(() => {
        console.log(error);
        return res.send("Error occurred");
      });
    }
    connection.commit((error) => {
      if (error) {
        return connection.rollback(() => {
          console.log(error);
          return res.send("Error occurred");
        });
      }
      connection.end();
      return res.send("Transaction completed successfully");
    });
  });
}

app.get("/transaction", (req, res) => {
  connection.beginTransaction((error) => {
    if (error) {
      return res.status(500).send("There is a server error");
    }
    const updateQuery = `
      UPDATE account
      SET balance = balance - 1000
      WHERE account_number = 101;
    `;
    const insertQuery = `
      INSERT INTO account_changes (account_id, amount, changed_date, remark)
      VALUES (101, -1000, NOW(), "Transferred to ID 102"), (102, 1000, NOW(), "Transfer from ID 101");
    `;

    queryDatabase(res, updateQuery);
    queryDatabase(res, insertQuery);
  });
});

app.listen(3000, () => {
  console.log("Server started");
});
