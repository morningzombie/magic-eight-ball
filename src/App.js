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

  const check = ev => {
    if ($("#newAnswer").val().length < 0) {
      $("#submit").prop("disabled");
    }
  };

  return (
    <div className="stars">
      <div className="twinkling">
        <div className="container">
          <div className="content">
            <h1>Magic Eight Ball</h1>
            <div className="">
              <span onClick={() => randomAnswer()}>
                <div className="big-ball">
                  <div className="circle">
                    <div className="triangle">
                      <div className="restrictWidth">
                        <div className="text">{decision}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
              <p>
                {numbers.length} total answers and {unique.length} unique
                answers and{" "}
              </p>
              {/* most returns {mostReturns} */}
            </div>

            <div className="container">
              <section>
                <form onSubmit={create}>
                  <h3>Add Your Own Answer</h3>
                  <div className="box">
                    <input
                      value={name}
                      type="text"
                      id="newAnswer"
                      onKeyUp={ev => check()}
                      onChange={ev => setName(ev.target.value)}
                    />
                    <button className="createButton" onClick={create}>
                      Create
                    </button>
                  </div>
                </form>

                <div>
                  {answers.map(answer => {
                    return (
                      <span
                        className="listAnswers"
                        // className={answer.archived ? "archived" : ""}
                        key={answer.id}
                      >
                        <span onClick={() => toggle(answer)}>
                          &nbsp;{answer.name}&nbsp;
                        </span>
                        <button
                          className="destroyButton"
                          onClick={() => destroy(answer)}
                        ></button>
                      </span>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
