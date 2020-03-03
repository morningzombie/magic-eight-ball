const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/api/answers", (req, res, next) => {
  db.readAnswers()
    .then(answers => {
      res.send(answers);
    })
    .catch(next);
});
app.post("/api/answers", (req, res, next) => {
  db.createAnswer()
    .then(answer => {
      res.send(answer);
    })
    .catch(next);
});

const port = process.env.PORT || 3000;

db.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
