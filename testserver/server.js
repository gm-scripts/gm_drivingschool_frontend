const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

let app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("lol");
});

let questions = JSON.parse(fs.readFileSync("testserver/questions.json"));
let openQuestion = 0;

app.post("/question", (req, res) => {
  console.log(req.body);
  res.send(questions[openQuestion]);
  openQuestion++;
  res.end();
});

app.listen(3000, () => console.log("Testserver ready."));
