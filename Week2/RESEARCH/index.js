const express = require("express");
const app = express();
const mySql = require("mysql");

const connection = mySql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "research",
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
  const query = `CREATE DATABASE IF NOT EXISTS research`;
  queryDatabase(query, res);
});

app.get("/createAuthorTable", (req, res) => {
  const query = `CREATE TABLE IF NOT EXISTS authors (
    author_id INT AUTO_INCREMENT,
    author_name VARCHAR(55),
    university VARCHAR(55),
    date_of_birth DATE,
    h_index INT,
    gender VARCHAR(10),
    PRIMARY KEY (author_id)
    )`;
  queryDatabase(query, res);
});

app.get("/addMentorColumn", (req, res) => {
  const query = `ALTER TABLE authors
  ADD mentor VARCHAR(55)`;
  queryDatabase(query, res);
});

app.get("/createResearchPapersTable", (req, res) => {
  const query = `CREATE TABLE IF NOT EXISTS research_Papers (
    paper_id INT AUTO_INCREMENT,
    paper_title VARCHAR(255),
    conference BOOLEAN,
    publish_date DATE,
    PRIMARY KEY (paper_id)
  )`;
  queryDatabase(query, res);
});

app.get("/createAuthorsPapersTable", (req, res) => {
  const query = `CREATE TABLE IF NOT EXISTS authors_papers (
    ID_Author INT,
    ID_Paper INT,
    PRIMARY KEY (ID_Author, ID_Paper),
    FOREIGN KEY (ID_Author) REFERENCES authors (author_id),
    FOREIGN KEY (ID_Paper) REFERENCES research_Papers (paper_id)
  )`;
  queryDatabase(query, res);
});

app.get("/insertAuthorsData", (req, res) => {
  const query = `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) 
  VALUES ("Jim Jones", "Cambridge", "1990-05-22", "8", "male", "Peter McFee"
  ), ("Karin Bishop", "Oxford", "1982-03-17", "12", "female", "Joseph Molison"
  ), ("Anne Rowlins", "Cambridge", "1986-01-30", "9", "female", "Jim Hardy"
  ), ("George Dawson", "Prinston", "1991-10-12", "22", "male", "Graham Tomson"
  ), ("Hamphrey Lucas", "Cambridge", "1981-11-17", "18", "male", "Peter McFee"
  ), ("Brandon Campbell", "Oxford", "1978-08-06", "65", "male", "Peter McFee"
  ), ("Robert Parkinson", "Oxford", "1977-09-03", "47", "male", "Peter McFee"
  ), ("Jeremy Lawrens", "Prinston", "1988-07-09", "19", "male", "Adrian Gregory"
  ), ("Rose Smith", "Oxford", "1985-07-17", "44", "female", "Peter McFee"
  ), ("Jessica Loft", "Cambridge", "1998-10-11", "13", "female", "Peter McFee"
  ), ("Sarah Parker", "Cambridge", "1991-12-27", "15", "female", "Adrian Gregory"
  ), ("Amanda Steel", "Cambridge", "1993-11-29", "32", "female", "Peter McFee"
  ), ("Tobias Steel", "Cambridge", "1992-02-24", "11", "male", "Peter McFee"
  ), ("Theodor Ram", "Prinston", "1990-07-17", "7", "male", "Peter McFee"
  ), ("Marcus Bishop", "Oxford", "1995-03-18", "25", "male", "Peter McFee"
  )`;
  queryDatabase(query, res);
});

app.get("/insertPapersData", (req, res) => {
  const query = `INSERT INTO research_Papers (paper_title, conference, publish_date) 
  VALUES ("Ecosystem of Sudan", "0", "2019-05-22"
  ), ("Ecosystem of New Zealand", "1", "2020-05-22"
  ), ("The concept of global health security", "1", "2023-05-22"
  ), ("The ways to decrease household air pollution", "0", "2021-05-22"
  ), ("The role of placebo treatment", "0", "2022-05-22"
  ), ("Pros and contras of medical marijuana", "1", "2018-05-22"
  ), ("Is being a vegetarian useful for child’s health?", "0", "2022-05-22"
  ), ("Underground effects of earthquakes", "0", "2023-05-22"
  ), ("Is it possible to predict hurricane impacts?", "1", "2021-05-22"
  ), ("How insomnia affects our health?", "0", "2021-05-22"
  ), ("How depression impacts the immune system?", "1", "2023-05-22"
  ), ("Can nanomedicine extend the human lifespan?", "0", "2018-05-22"
  ), ("The role cryogenics may play in future", "0", "2019-05-22"
  ), ("Can alternative energy replace fossil fuels?", "0", "2019-05-22"
  ), ("What is the evidence that CMB is the result of the big bang?", "0", "2021-05-22"
  ), ("How will self-driving cars change the way people live?", "0", "2017-05-22"
  ), ("Why was Greek cultural influence so important for ancient world?", "1", "2023-05-22"
  ), ("Why was the Victorian period a time of cultural change?", "0", "2020-05-22"
  ), ("What is the relationship between music and math?", "0", "2020-05-22"
  ), ("What are some of the most confusing math problems ever?", "1", "2023-05-22"
  ), ("How to build a successful startup", "1", "2022-05-22"
  ), ("The impact of climate change on international business strategies", "1", "2021-05-22"
  ), ("Is the greenhouse effect artificial or natural?", "1", "2020-05-22"
  ), ("The causes, effects, and consequences of earthquakes", "0", "2022-05-22"
  ), ("Gender roles in children’s books and cartoons", "0", "2021-05-22"
  ), ("Methods used by ancient sailors to navigate the globe", "1", "2019-05-22"
  ), ("The ways to improve school safety", "0", "2018-05-22"
  ), ("What were the impacts of World War II on the rights of women?", "0", "2017-05-22"
  ), ("Aztec empire and its architecture", "0", "2019-05-22"
  ), ("What is the correlation between the Roman and Greek culture?", "0", "2019-05-22"
  )`;
  queryDatabase(query, res);
});

app.get("/insertAuthorsPapersData", (req, res) => {
  const query = `INSERT INTO authors_papers (ID_Author, ID_Paper)
  VALUES (1, 1),
         (1, 2),
         (1, 17),
         (1, 18),
         (2, 1),
         (2, 2),
         (2, 19),
         (2, 20),
         (3, 7),
         (3, 6),
         (3, 21),
         (3, 22),
         (4, 6),
         (4, 5),
         (4, 23),
         (5, 3),
         (5, 4),
         (5, 24),
         (6, 5),
         (6, 4),
         (6, 25),
         (7, 9),
         (7, 8),
         (7, 26),
         (8, 10),
         (8, 27),
         (9, 10),
         (9, 28),
         (10, 11),
         (11, 12),
         (11, 29),
         (12, 13),
         (12, 30),
         (13, 12),
         (13, 11),
         (14, 16),
         (14, 14)       
         `;
  queryDatabase(query, res);
});

//Write a query that prints names of all authors and their corresponding mentors.
app.get("/get/authors_mentors", (req, res) => {
  const query = `SELECT author_name, mentor FROM authors`;
  queryDatabase(query, res);
});

/*Write a query that prints all columns of authors and their published paper_title.
If there is an author without any research_Papers, print the information of that author too.*/
app.get("/get/author_PaperTitle", (req, res) => {
  const query = `SELECT authors.author_name, research_Papers.paper_title FROM authors 
  LEFT JOIN authors_papers
  ON author_id = authors_papers.ID_Author
  LEFT JOIN research_Papers
  ON paper_id = authors_papers.ID_Paper`;
  queryDatabase(query, res);
});

app.get("/get/author_PaperTitle", (req, res) => {
  const query = `SELECT authors.*, research_Papers.paper_title
    FROM authors
    LEFT JOIN authors_papers ON authors.author_id = authors_papers.ID_Author
    LEFT JOIN research_Papers ON authors_papers.ID_Paper = research_Papers.paper_id`;
  queryDatabase(query, res);
});

//All research papers and the number of authors that wrote that paper.
app.get("/allResearchPapers_numOfAuthors", (req, res) => {
  const query = `SELECT research_Papers.paper_title, COUNT(authors_papers.ID_Author) AS num_authors
    FROM research_Papers
    JOIN authors_papers ON research_Papers.paper_id = authors_papers.ID_Paper
    GROUP BY research_Papers.paper_id`;
  queryDatabase(query, res);
});

//Sum of the research papers published by all female authors.
app.get("/sumResearchPapers_femaleAuthors", (req, res) => {
  const query = `SELECT COUNT(*) AS sum_papers
    FROM research_Papers
    JOIN authors_papers ON research_Papers.paper_id = authors_papers.ID_Paper
    JOIN authors ON authors_papers.ID_Author = authors.author_id
    WHERE authors.gender = 'female'`;
  queryDatabase(query, res);
});

//Average of the h-index of all authors per university.
app.get("/avgHIndex_perUniversity", (req, res) => {
  const query = `SELECT university, AVG(h_index) AS avg_hindex
    FROM authors
    GROUP BY university`;
  queryDatabase(query, res);
});

//Sum of the research papers of the authors per university.
app.get("/sumResearchPapers_perUniversity", (req, res) => {
  const query = `SELECT university, COUNT(*) AS sum_papers
    FROM research_Papers
    JOIN authors_papers ON research_Papers.paper_id = authors_papers.ID_Paper
    JOIN authors ON authors_papers.ID_Author = authors.author_id
    GROUP BY university`;
  queryDatabase(query, res);
});

//Minimum and maximum of the h-index of all authors per university.
app.get("/minMaxHIndex_perUniversity", (req, res) => {
  const query = `SELECT university, MIN(h_index) AS min_hindex, MAX(h_index) AS max_hindex
    FROM authors
    GROUP BY university`;
  queryDatabase(query, res);
});

app.get("/", (req, res) => {
  res.send("Hello everyone!");
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
