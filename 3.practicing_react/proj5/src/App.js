import { useState } from "react";

const questions =[
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript"
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components"
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX"
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props"
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook"
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element"
  }
];

function App() {

  const [selectedId,setSelectedId]=useState(null);
  
  return (
    <div className="App" style={{backgroundColor:'blueviolet', padding:'20px'}} >
      {questions.map((q)=>(
      <div style={{margin: '20px', backgroundColor:q.id===selectedId ?'red':'greenyellow'}} onClick={()=>setSelectedId(q.id)} >
        <p>{q.id===selectedId?q.answer:q.question}</p>
      </div>))}
    </div>
  );
}

export default App;
