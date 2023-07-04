import mongo from "mongodb";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import csv from "csv-parser";
import fs from "fs";
import { cleanUpAccounts, fillSampleData } from "./setup.js";
dotenv.config();
const app = express();
app.use(express.json());

//create standard setting of MongoClient
export const client = new MongoClient(process.env.MONGODB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 }); //test of connection
//     console.log("Connection successful");
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.error());

// async function csvToMongo() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");
//     const collection = client.db("week4").collection("transaction");
//     // await collection.deleteMany({}) clean the collection if necessary
//     const existingData = await collection.countDocuments({}, (error) => {
//       console.log(error);
//     });

//     if (existingData > 0) {
//       console.log("Already exists");
//       client.close();
//       return;
//     }
//     const data = [];
//     fs.createReadStream("./accounts.csv")
//       .pipe(csv())
//       .on("data", (row) => {
//         data.push(row);
//       })
//       .on("end", async () => {
//         await collection.insertMany(data);
//         client.close();
//       });
//   } catch (error) {
//     console.log(error);
//   }
// }
// csvToMongo();
// setup.js

const accounts = [];

// Clean up the accounts array
function cleanUpAccounts() {
  accounts.length = 0;
}

// Fill the accounts array with sample data
function fillSampleData() {
  cleanUpAccounts();

  // Sample data for account 1
  const account1 = {
    account_number: "A001",
    balance: 1000,
    account_changes: [
      {
        change_number: 1,
        amount: -200,
        changed_date: new Date("2023-06-27"),
        remark: "Withdrawal",
      },
      {
        change_number: 2,
        amount: 500,
        changed_date: new Date("2023-06-28"),
        remark: "Deposit",
      },
    ],
  };

  // Sample data for account 2
  const account2 = {
    account_number: "A002",
    balance: 5000,
    account_changes: [
      {
        change_number: 1,
        amount: -1000,
        changed_date: new Date("2023-06-28"),
        remark: "Withdrawal",
      },
      {
        change_number: 2,
        amount: 2000,
        changed_date: new Date("2023-06-29"),
        remark: "Deposit",
      },
    ],
  };

  accounts.push(account1, account2);
}

// Export the functions
module.exports = {
  cleanUpAccounts,
  fillSampleData,
};
