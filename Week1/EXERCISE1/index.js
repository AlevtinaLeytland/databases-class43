const express = require("express");
const mySql = require("mysql");

const app = express();

const connection = mySql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

//general function for connection queries
function connectionQuery(params, res) {
  connection.query(params, (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error happened");
    }
    console.log(result);
    res.send(result);
  });
}

app.get("/createdb", (req, res) => {
  const createDB = `CREATE DATABASE IF NOT EXISTS meetup`;
  connectionQuery(createDB, res);
});

//get database
app.get("/createInvitee", (req, res) => {
  const createInviteTable = `CREATE TABLE IF NOT EXISTS invitee (
  invitee_no int AUTO_INCREMENT,
  invitee_name  VARCHAR(255),
  invited_by VARCHAR(255),
  PRIMARY KEY (invitee_no))`;
  connectionQuery(createInviteTable, res);
});

//adding attributes and values to the invitee table
const insertAttrib = `INSERT INTO invitee (invitee_name, invited_by) VALUES ('Tom', 'Rick'),
('John', 'Peter'), ('Fred', 'Colin'), ('Nick', 'Rick'), ('Tom', 'Rick'); `;

app.get("/insertAttributes", (req, res) => {
  connectionQuery(insertAttrib, res);
});

//creating room table, adding attributes and values
app.get("/createRoom", (req, res) => {
  const createRoomTable = `CREATE TABLE IF NOT EXISTS room (
    room_no int AUTO_INCREMENT,
    room_name  VARCHAR(255),
    floor_no int,
    PRIMARY KEY (room_no))`;
  connectionQuery(createRoomTable, res);
});
const insertRoomAttrib = `INSERT INTO room (room_name, floor_no) VALUES ('green', 2),
  ('yellow', 3), ('blue', 4), ('red', 5), ('white', 6); `;

app.get("/insertRoomAttributes", (req, res) => {
  connectionQuery(insertRoomAttrib, res);
});

//create meeting table, add attributes and values
app.get("/createMeeting", (req, res) => {
  const createMeetingTable = `CREATE TABLE IF NOT EXISTS meeting (
      meeting_no int AUTO_INCREMENT,
      meeting_title  VARCHAR(255),
      starting_time time,
      ending_time time,
      room_no int,
      PRIMARY KEY (meeting_no))`;
  connectionQuery(createMeetingTable, res);
});
const insertMeetingAttrib = `INSERT INTO meeting (meeting_title, starting_time, ending_time) VALUES ('green', '11:00:00', '13:00:00'),
    ('ecology', '13:00:00', '15:00:00'), ('business', '16:00:00', '18:00:00'), ('economics', '11:00:00', '13:00:00'), ('politics', '18:00:00', '20:00:00'); `;

app.get("/insertMeetingAttributes", (req, res) => {
  connectionQuery(insertMeetingAttrib, res);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
