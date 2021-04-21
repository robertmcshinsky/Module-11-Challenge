console.log("@server.js");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
///////
const { notes } = require("./data/db.json");
const fs = require("fs");
////////////////////////////////

function filterByQuery(query, notesArray) {
  let filtered = notesArray;

  if (query.id) {
    filtered = filtered.filter((notes) => notes.id === query.id);
  }
  if (query.name) {
    filtered = filtered.filter((notes) => notes.name === query.name);
  }
  return filtered;
}

////////////////////////////////

//!GET HOME ROUTE
app.get("/", function (req, res) {
  res.send("@ / get route");
});

//!GET API NOTES ROUTE
app.get("/api/notes", function (req, res) {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//!POST API NOTES ROUTE
app.post("/api/notes", function (req, res) {});

////////////////////////////////

app.listen(port, function () {
  console.log("Listening on port " + port);
});
