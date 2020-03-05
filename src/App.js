import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [name, setName] = useState("");
  const [decision, setDecision] = useState("");
  const [numbers, setNumbers] = useState([], { id: 0, value: "" });

  useEffect(() => {
    axios.get("/api/answers").then(response => setAnswers(response.data));
  }, []);

  const randomAnswer = () => {
    let rand = answers[Math.floor(Math.random() * answers.length)].name;
    console.log(rand);
    setDecision(rand);
    setNumbers([...numbers, { id: numbers.length, value: rand }]);

    console.log(...numbers);
  };

  const unique = [...new Set(numbers.map(number => number.value))];

  // const mostReturns = numbers.reduce((total, val) => {
  //   total[val] = (total[val] || 0) + 1;
  // });
  // console.log(mostReturns);

  const toggle = answer => {
    const updated = { ...answer, archived: !answer.archived };
    axios.put(`/api/answers/${answer.id}`, updated).then(response => {
      setAnswers(answers.map(n => (n.id === answer.id ? response.data : n)));
    });
  };

  const destroy = answerToDestroy => {
    axios
      .delete(`/api/answers/${answerToDestroy.id}`)
      .then(() =>
        setAnswers(answers.filter(answer => answer.id !== answerToDestroy.id))
      );
  };

  const create = ev => {
    ev.preventDefault();
    axios
      .post("/api/answers", { name })
      .then(response => setAnswers([response.data, ...answers]))
      .then(() => setName(""));
  };

  return (
    <div>
      <h1 className="title">Magic Eight Ball</h1>
      <div>
        <button onClick={() => randomAnswer()}>Click</button>
        <div className="circle">
          <p className="triangle-up">{decision}</p>
        </div>
        {numbers.length} total answers and {unique.length} unique answers and
        {/* most returns {mostReturns} */}
      </div>
      <div className="container">
        <section>
          <form onSubmit={create}>
            <h2>Add Your Own Answer</h2>
            <input value={name} onChange={ev => setName(ev.target.value)} />
            <button onClick={create}>Create</button>
            <br />
          </form>

          <ul>
            {answers.map(answer => {
              return (
                <li
                  className={answer.archived ? "archived" : ""}
                  key={answer.id}
                >
                  <span onClick={() => toggle(answer)}>{answer.name}</span>
                  <button onClick={() => destroy(answer)}>x</button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default App;
