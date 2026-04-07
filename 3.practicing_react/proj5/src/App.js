import { useState } from "react";

function App() {

  let [div1, setDiv1]=useState('What language is React based on ?')
  let [div2, setDiv2]=useState('What are building blocks of react apps ?')
  return (
    <div className="App">
      <div className="div1"  onClick={()=>{setDiv1('Javascript')}} >
        <p>{div1}</p>
      </div>

      <div className="div2" onClick={()=>{setDiv2('Components')}}>
        <p>{div2}</p>
      </div>

    </div>
  );
}

export default App;
