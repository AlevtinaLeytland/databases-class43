import { client } from "./seedDatabase.js";
import fs from "fs";
import csv from "csv-parser";
import express from "express";
const app = express();
app.use(express.json());
const collection = client.db("week4").collection("populationPyramid");
const myDB = client.db("week4");

const continents = [
  "AFRICA",
  "ASIA",
  "EUROPE",
  "LATIN AMERICA AND THE CARIBBEAN",
  "NORTHERN AMERICA",
  "OCEANIA",
];

async function csvToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    // const collection = client.db("week4").collection("populationPyramid");
    // await collection.deleteMany({}) clean the collection if necessary
    const existingData = await collection.countDocuments({}, (error) => {
      console.log(error);
    });

    if (existingData > 0) {
      console.log("Already exists");
      client.close();
      return;
    }
    const data = [];
    fs.createReadStream("./population_pyramid_1950-2022.csv")
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", async () => {
        await collection.insertMany(data);
        client.close();
      });
  } catch (error) {
    console.log(error);
  }
}
csvToMongo();

app.get("/population/:country", async (req, res) => {
  const country = req.params.country;

  try {
    await client.connect();
    // const db = client.db(myDB);
    // const collection = db.collection(collection);

    const pipeline = [
      {
        $match: {
          Country: country,
        },
      },
      {
        $group: {
          _id: "$Year",
          countPopulation: {
            $sum: { $add: [{ $toInt: "$M" }, { $toInt: "$F" }] },
          },
        },
      },
      {
        $project: {
          _id: 1,
          countPopulation: 1,
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();

    client.close();

    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/yearAge", async (req, res) => {
  try {
    const year = req.query.year;
    // const age = req.query.age;
    console.log(year);
    await client.connect();
    const pipeline = [
      {
        $match: { Year: year, Age: "100+", Country: { $in: continents } },
      },
      {
        $addFields: {
          TotalPopulation: { $add: [{ $toInt: "$M" }, { $toInt: "$F" }] },
        },
      },
    ];
    const result = await collection.aggregate(pipeline).toArray();
    console.log(result);
    client.close();

    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3000, (err) => {
  err ? console.log(err) : console.log("Server started");
});
