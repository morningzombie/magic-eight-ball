const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");
app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use(express.static(__dirname + "/assets"));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.post("/api/answers", (req, res, next) => {
  db.create(req.body)
    .then(answer => {
      res.send(answer);
    })
    .catch(next);
});

// app.put("/api/answers/:id", async (req, res, next) => {
//   try {
//     let answers = await readJSON("./answers.json");
//     answers = answers.map(answer =>
//       answer.id === req.body.id ? req.body : answer
//     );
//     await writeJSON("./answers.json", answers);
//     res.send(req.body);
//   } catch (ex) {
//     next(ex);
//   }
// });

app.delete("/api/answers/:id", (req, res, next) => {
  db.deleteAnswer(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.get("/api/answers", (req, res, next) => {
  db.readAnswers()
    .then(answers => {
      res.send(answers);
    })
    .catch(next);
});

const port = process.env.PORT || 8080;

db.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
