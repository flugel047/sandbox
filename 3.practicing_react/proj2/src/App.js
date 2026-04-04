import { useState } from "react";

const messages=[
    "Learn React *",
    "Apply for jobs",
    "Invest your new income"
]


export default function App(){

    const[index,setIndex]=useState(0);
    const[isOpen,setIsOpen]=useState(true);

    function nextClick(){
        if(index<messages.length-1)
            setIndex((s)=>s+1);
    console.log(index);
    }

    function prevClick(){
        if(index>0)
            setIndex((s)=>s-1);
        console.log(index);
    }

    return (
        <div>
        <button onClick={()=>{setIsOpen(!isOpen)}} >X</button>
        {isOpen && (
            <div className="steps">
                
                <div className="numbers">
                    <div className={index>=0 ?"active":''}>1</div>
                    <div className={index>=1 ?"active":''}>2</div>
                    <div className={index>=2 ?"active":''}>3</div>
                </div>

                <p className="message">Step {index+1}: {messages[index]}</p>

                <div className="buttons">
                    <button style={{backgroundColor: '#1d5e9f'}} onClick={prevClick} >Previous</button>
                    <button style={{backgroundColor: '#1d5e9f'}} onClick={nextClick} >Next</button>
                </div>

            </div> )}
        </div>
        
    )
}

