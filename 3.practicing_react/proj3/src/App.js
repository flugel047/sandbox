import { useState } from "react";

function App() {

  let [step,setStep]=useState(0);
  let [count,setCount]=useState(0);

  let date= new Date();
  

  return (
    <div>
      <div className="box1" style={{display:"flex"}} >
      <button onClick={() => setStep((s) => s - 1)}>-</button>
        <h2>Step: {step}</h2>
      <button onClick={() => setStep((s) => s + 1)}>+</button> 
      </div>

      <div className="box2" style={{display:"flex"}} >
      <button onClick={() => setCount((s) => s - 1)}>-</button>
        <h2>Step: {count}</h2>
      <button onClick={() => setCount((s) => s + 1)}>+</button>  
      </div>
      
      <h2>Today is {date.toDateString()}</h2>
    </div>
  );
}

export default App;
