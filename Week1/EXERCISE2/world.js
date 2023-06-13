const express = require("express");
const mySql = require("mysql");

const app = express();

const connection = mySql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

const queryDatabase = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// What are the names of countries with population greater than 8 million?
app.get("/countries/population", async (req, res) => {
  try {
    const query = `SELECT Name FROM country WHERE Population > 8000000`;
    const results = await queryDatabase(query);
    const countryNames = results.map((row) => row.Name);
    res.json(countryNames);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// What are the names of countries that have "land" in their names?
app.get("/countries/name", async (req, res) => {
  try {
    const query = `SELECT Name FROM country WHERE Name LIKE '%land%`;
    const results = await queryDatabase(query);
    const countryNames = results.map((row) => row.Name);
    res.json(countryNames);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// What are the names of the cities with population between 500,000 and 1 million?
app.get("/cities/population", async (req, res) => {
  try {
    const query = `SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000`;
    const results = await queryDatabase(query);
    const cityNames = results.map((row) => row.Name);
    res.json(cityNames);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// What's the name of all the countries on the continent 'Europe'?
app.get("/countries/continent", async (req, res) => {
  try {
    const query = `SELECT Name FROM country WHERE Continent = 'Europe'`;
    const results = await queryDatabase(query);
    const countryNames = results.map((row) => row.Name);
    res.json(countryNames);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//List all the countries in the descending order of their surface areas.

app.get("/countries/surfaceAreas", async (req, res) => {
  try {
    const query = `SELECT Name FROM country ORDER BY SurfaceArea DESC`;
    const results = await queryDatabase(query);
    const countryNames = results.map((row) => row.Name);
    res.json(countryNames);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//What are the names of all the cities in the Netherlands?
app.get("/cities/dutch", async (req, res) => {
  try {
    const query = `SELECT Name FROM city WHERE CountryCode = 'NLD'`;
    const results = await queryDatabase(query);
    const cityNames = results.map((row) => row.Name);
    res.json(cityNames);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//What is the population of Rotterdam?
app.get("/population/Rotterdam", async (req, res) => {
  try {
    const query = `SELECT Population FROM city WHERE Name = 'Rotterdam'`;
    const results = await queryDatabase(query);
    const population = results.find((row) => row.Population);
    res.json(population);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//What's the top 10 countries by Surface Area?
app.get("/top10/surfaceArea", async (req, res) => {
  try {
    const query = `SELECT Name from country ORDER BY SurfaceArea DESC LIMIT 10`;
    const results = await queryDatabase(query);
    const countries = results.map((row) => row.Name);
    res.json(countries);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
//What's the top 10 most populated cities?
app.get("/top10/populatedCities", async (req, res) => {
  try {
    const query = `SELECT Name FROM city ORDER BY Population DESC LIMIT 10`;
    const results = await queryDatabase(query);
    const cities = results.map((row) => row.Name);
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//What is the population number of the world?
app.get("/population/global", async (req, res) => {
  try {
    const query = `SELECT SUM(Population) AS globalPopulation FROM country`;
    const results = await queryDatabase(query);
    const population = results[0].globalPopulation;
    res.json(population);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  } finally {
    connection.end();
  }
});

app.get("/", (req, res) => {
  res.send("I'm succeeding");
});

app.listen(3001, () => {
  console.log("Server started");
});
