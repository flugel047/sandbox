import { useState } from "react";

function App() {

  let [step,setStep]=useState(1);
  let [count,setCount]=useState(0);

  let date= new Date();
  date.setDate(date.getDate()+count);
  

  return (
    <div>
      <div className="box1" style={{display:"flex"}} >
      <button onClick={() => setStep((s) => s - 1)}>-</button>
        <h2>Step: {step}</h2>
      <button onClick={() => setStep((s) => s + 1)}>+</button> 
      </div>

      <div className="box2" style={{display:"flex"}} >
      <button onClick={() => setCount((s) => s - step)}>-</button>
        <h2>Count: {count}</h2>
      <button onClick={() => setCount((s) => s + step)}>+</button>  
      </div>
      
      <h2>{count?`${count} days from today is ${date.toDateString()}` :`Today is ${date.toDateString()}`}</h2>
    </div>
  );
}

export default App;
