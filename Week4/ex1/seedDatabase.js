import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
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
