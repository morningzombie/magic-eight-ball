import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [name, setName] = useState("");
  const [decision, setDecision] = useState("");
  const [numbers, setNumbers] = useState([], { id: 0, value: "" });
  const [allResults, setAllResults] = useState([])

  useEffect(() => {
    axios.get("/api/answers").then(response => setAnswers(response.data));
  }, []);

  const randomAnswer = () => {
    let rand = answers[Math.floor(Math.random() * answers.length)].name;
    setDecision(rand);
    setAllResults(allResults => [...allResults, rand]);
    setNumbers([...numbers, { id: numbers.length, value: rand }]);
  };
 const unique = [...new Set(numbers.map(number => number.value))];
//console.log("allResults", allResults)


let mostResults
// let mostFeatured = 1;
// let count = 0;
// let item;
// for (let i=0; i<allResults.length; i++)
// {
//         for (let j=i; j<allResults.length; j++)
//         {
//                 if (allResults[i] == allResults[j])
//                  count++;
//                 if (mostFeatured<count)
//                 {
//                   mostFeatured=count; 
//                   item = allResults[i];
//                 }
//         }
//         count=0;
// }
var counts = {}; //We are going to count occurrence of item here
var compare = 0;  //We are going to compare using stored value
var mostFrequent;  //We are going to store most frequent item

for(var i = 0, len = allResults.length; i < len; i++){
  var word = allResults[i];

  if(counts[word] === undefined){ //if count[word] doesn't exist
     counts[word] = 1;    //set count[word] value to 1
  }else{                  //if exists
     counts[word] = counts[word] + 1; //increment existing value
  }
  if(counts[word] > compare){  //counts[word] > 0(first time)
     compare = counts[word];   //set compare to counts[word]
     mostFrequent = allResults[i];  //set mostFrequent value
  }
}

//console.log(`${item} ( ${mostFeatured} times ) `);
//console.log(item)
//const mostReturns = `${item} ( ${mostFeatured} times ) `
if (compare>1){
 mostResults = `"${mostFrequent}" is the most popular prediction at ${compare} times `
}

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

  // const check = ev => {
  //   {
  //   if ($("#newAnswer").val().length < 0) {
  //     $("#submit").prop("disabled");
  //   }
  // }};

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
                <br />{mostResults}
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
                      // type="text"
                      // id="newAnswer"
                      // onKeyUp={ev => check()}
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
