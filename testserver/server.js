const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

let app = express();

app.use(cors());
app.use(bodyParser.json());

let questions = JSON.parse(fs.readFileSync("testserver/questions.json"));
let openQuestion = 0;
let results = [];
let failAt = 0.5;

let passed = () => {
  let sum = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i]) sum++;
  }
  console.log("29: " + results.length);
  let r = sum / results.length;
  return r >= failAt;
};

app.post("/question", (req, res) => {
  let data = req.body;
  /*
  {
    "answerIsCorrect": true | false
  }

  answerIsCorrect indicates if the previous question was correct or not.
*/
  console.log(data);
  if (data.answerIsCorrect !== null) {
    results.push(data.answerIsCorrect);
  }
  console.log(results);
  res.json({
    question: questions[openQuestion],
    questionIndex: openQuestion,
    progress: openQuestion / questions.length,
    last: openQuestion === questions.length - 1
  });
  openQuestion++;
  res.end();
});

app.post("/get-results", (req, res) => {
  let data = req.body;
  /*
  {
    "answerIsCorrect": true | false
  }

  answerIsCorrect now is for the last question, to calculate the result.
*/
  results.push(data.answerIsCorrect);
  let r = passed();
  // If r === true, give user drivers license now
  console.log(r);
  res.send(r.toString());
  res.end();
});

app.post("/close", (/* req, res */) => {
  console.log("ending quiz");
  openQuestion = 0;
  results = [];
  // Take NUI Window out of focus
});

//
// Now the getters for config and lang
//
let config = JSON.parse(fs.readFileSync("testserver/config.json"));
let lang = JSON.parse(fs.readFileSync("testserver/lang.json"));
app.get("/config/colors", (req, res) => {
  console.log("GET to /config/colors received.");
  res.json(config.colors);
  res.end();
});

app.get("/lang/welcome", (req, res) => {
  console.log("GET to /lang/welcome received.");
  res.json(lang.welcome);
  res.end();
});

app.get("/lang/failed", (req, res) => {
  console.log("GET to /lang/failed received.");
  res.json(lang.failed);
  res.end();
});
app.get("/lang/passed", (req, res) => {
  console.log("GET to /lang/passed received.");
  res.json(lang.passed);
  res.end();
});
app.get("/lang/test", (req, res) => {
  console.log("GET to /lang/test received.");
  res.json(lang.test);
  res.end();
});

app.listen(3000, () => console.log("Testserver ready."));
