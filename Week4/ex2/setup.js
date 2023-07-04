import mongo from "mongodb";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
// import csv from "csv-parser";
// import fs from "fs";

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

async function setup() {
  try {
    await client.connect();

    const db = client.db("week4");
    const accountsCollection = db.collection("accounts");

    // Clean up the accounts array
    await accountsCollection.deleteMany({});

    // Fill the accounts array with sample data
    const sampleData = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: [
          {
            change_number: 1,
            amount: 5000,
            changed_date: new Date(),
            remark: "Initial deposit",
          },
        ],
      },
      {
        account_number: 102,
        balance: 2500,
        account_changes: [
          {
            change_number: 1,
            amount: 2500,
            changed_date: new Date(),
            remark: "Initial deposit",
          },
        ],
      },
    ];

    await accountsCollection.insertMany(sampleData);

    console.log("Sample data inserted successfully.");
  } catch (error) {
    console.error("Error setting up the database:", error);
  } finally {
    await client.close();
  }
}

setup();
