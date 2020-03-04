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

  return (
    <div>
      <div>Magic Eight Ball</div>
      <form onSubmit={onSubmit}>
        <h2>Add Answer</h2>
        <input value={name} onChange={ev => setName(ev.target.value)} />
        <button>Create</button>
      </form>
      <button onClick={() => randomAnswer()}>Click</button>
    </div>
  );
};

export default App;
