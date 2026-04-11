import { useState } from "react";


function App() 
{
  const[bill,setBill]=useState(0);
  const [tip,setTip]=useState(0);
  const[service,setService]=useState(0);
  

  let total= bill*tip*service + bill;

  function Reset(){
    setBill(0)
    setService(0)
    setTip(0)
  }
  

  
  return(
    <div >
      <div >
      <h2>How much was the bill ?</h2>
      <input type='number' value={bill} onChange={(e)=>setBill(Number(e.target.value))}/>
      </div>
      <h2>How did you like the service ?</h2>
      <select name="" onChange={(e)=>setTip(Number(e.target.value))}>
        <option value="0.10">Ok</option>
        <option value="0.20">Satisfied</option>
        <option value="0.30">Amazing</option>
      </select>
      <h2>How did your friend like the service ?</h2>
      <select name="" onChange={(e)=>setService(Number(e.target.value))}>
        <option value="0.10">Ok</option>
        <option value="0.20">Satisfied</option>
        <option value="0.30">Amazing</option>
      </select>

      <h1>You pay ${total}</h1>

      <button onClick={Reset}>Reset</button>

    </div>
  )
}
export default App;