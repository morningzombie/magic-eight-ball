import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("/api/answers").then(response => setAnswers(response.data));
  }, []);

  useEffect(() => {
    axios.get("/api/questions").then(response => setQuestions(response.data));
  }, []);

  return (
    <div>
      <div>Magic Eight Ball</div>
      <ul>
        {answers.map(answer => {
          return <li key={answer.id}>{answer.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
