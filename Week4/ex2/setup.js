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
