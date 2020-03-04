import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [answer, setAnswer] = useState([]);
  useEffect(() => {
    axios.get("/api/answers").then(response => setAnswer(response.data));
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

  const randomAnswer = answer => {
    console.log(answer.name);
  };
  //const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

  return (
    <div>
      <div>Magic Eight Ball</div>
      <button onClick={() => randomAnswer(answer)}>Click</button>
      {answer}
    </div>
  );
};

export default App;
