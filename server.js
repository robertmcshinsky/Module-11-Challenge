console.log("@server.js");

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///////
const port = process.env.PORT || 3000;

const { notes } = require("./data/db.json");

const fs = require("fs");
const path = require("path");
////////////////////////////////

function filterByQuery(query, notesArray) {
  console.log("@filterByQuery");
  let filtered = notesArray;

  if (query.title) {
    filtered = filtered.filter((notes) => notes.title === query.title);
  }
  if (query.text) {
    filtered = filtered.filter((notes) => notes.text === query.text);
  }
  return filtered;
}

function createNewNote(body, notesArray) {
  console.log("@createNewNote");
  console.log(body);
  let note = body;
  notesArray.push(note);

  fs.writeFileSync(
    path.join(__dirname, "./data/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return note;
}
////////////////////////////////

//! GET HOME ROUTE
app.get("/", function (req, res) {
  console.log("@getHomeRoute");
  res.send("@ / get route");
});

//! GET API NOTES ROUTE
app.get("/api/notes", function (req, res) {
  console.log("@getAPINotesRoute");
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//! POST API NOTES ROUTE
app.post("/api/notes", function (req, res) {
  console.log("@PostAPINotesRoute");
  req.body.id = notes.length.toString();

  const note = createNewNote(req.body, notes);

  console.log(req.body);
  res.json(req.body);
});

////////////////////////////////

app.listen(port, function () {
  console.log("@Listening");
  console.log("Listening on port " + port);
});
