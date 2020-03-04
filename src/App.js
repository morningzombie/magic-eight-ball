import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get("/api/answers").then(response => setAnswers(response.data));
  }, []);
  // useEffect(() => {
  //   axios
  //     .get("/api/answers")
  //     .then(response =>
  //       setAnswer(
  //         response.data[Math.floor(Math.random() * response.data.length)].name
  //       )
  //     );
  // }, []);

  const randomAnswer = () => {
    let rand = answers[Math.floor(Math.random() * answers.length)].name;
    console.log(rand);
  };
  //const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

  const createAnswer = async answer => {
    try {
      const created = (await axios.post("/api/answers", answer)).data;
      setAnswers([...answers, created]);
      setError("");
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  // const AnswerForm = ({ createAnswer }) => {
  const [name, setName] = useState("");
  const onSubmit = ev => {
    ev.preventDefault();
    createAnswer({ name });
  };

  //console.log("ANSWERS", answers[0]);
//console.log(Object.values(answers[0]));


const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
console.log("HERE", randomAnswer)



return (
    <div>
      <div>Magic Eight Ball</div>
<<<<<<< HEAD
      <form onSubmit={onSubmit}>
        <h2>Add Answer</h2>
        <input value={name} onChange={ev => setName(ev.target.value)} />
        <button>Create</button>
      </form>
      <button onClick={() => randomAnswer()}>Click</button>
=======

      <ul>
          {answers.map(answer => {
          return <li key={answer.id}>{answer.name}</li>;
        })}
      </ul>

     
>>>>>>> a3b3c8678305b507df89de7c8644c95562fadcfc
    </div>
  );
};

export default App;
