// transfer.js

import mongo from "mongodb";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
// import csv from "csv-parser";
// import fs from "fs";

dotenv.config();
const app = express();
app.use(express.json());

// const uri = process.env.MONGODB;
// const client = new MongoClient(uri);
export const client = new MongoClient(process.env.MONGODB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function transfer(fromAccountNumber, toAccountNumber, amount, remark) {
  try {
    await client.connect();

    const db = client.db("week4");
    const collection = db.collection("accounts");

    const session = client.startSession();
    session.startTransaction();

    const fromAccount = await collection.findOne({
      account_number: fromAccountNumber,
    });
    const toAccount = await collection.findOne({
      account_number: toAccountNumber,
    });

    if (!fromAccount || !toAccount) {
      console.log("One or both account numbers are invalid.");
      return;
    }

    const fromChangeNumber = fromAccount.account_changes.length + 1;
    const toChangeNumber = toAccount.account_changes.length + 1;

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    fromAccount.account_changes.push({
      change_number: fromChangeNumber,
      amount: -amount,
      changed_date: new Date(),
      remark,
    });

    toAccount.account_changes.push({
      change_number: toChangeNumber,
      amount,
      changed_date: new Date(),
      remark,
    });

    await collection.updateOne(
      { account_number: fromAccountNumber },
      { $set: fromAccount },
      { session },
    );
    await collection.updateOne(
      { account_number: toAccountNumber },
      { $set: toAccount },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    console.log(
      `Transfer of ${amount} from account ${fromAccountNumber} to account ${toAccountNumber} successful.`,
    );
  } catch (error) {
    console.error("Error transferring funds:", error);

    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
  } finally {
    await client.close();
  }
}
transfer(101, 102, 200, "Withdrawal taxes");
