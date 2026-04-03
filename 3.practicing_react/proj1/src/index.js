import React from "react";
import ReactDOM from 'react-dom/client';
import "./index.css"


const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

const openHours=7;
const closeHours=22;
const currentHours= new Date().getHours();
console.log(currentHours);



function Header(){
  return <h2>Fast React Pizza Co.</h2>
}

function Menu(){
  return (
    
      <main className="menu">
        <h2>Our Menu</h2>
        <li className="pizzas">
          {pizzaData.map((pizza)=>(
            <Pizza 
            key={pizza.name}
            name={pizza.name} 
            photoName={pizza.photoName} 
            ingredient={pizza.ingredients}  
            price={pizza.price}
            />
          ))}
        </li>
        </main>
    
  )
  
}

function Pizza(props){
  return (
    <div className="pizza">
      <img src={props.photoName} alt="" />
      <div>
           <h3>{props.name}</h3>
            <p>{props.ingredient}</p>
            <span>{props.price}</span>
      </div>
     
      
    </div>
  )
}

function Footer(){

return <>
  <p className="footer"></p>
</>
}
function App(){
  return <h1 style={{color: 'red'}} >Hello this world</h1>
}

// if(currentHours<closeHours && currentHours>openHours)
// {
//   document.querySelector('.footer').textContent='Welcome to Pizaa Shop';
// }
// else document.querySelector('.footer').textContent=`Sorry we're closed`;



const root=ReactDOM.createRoot(document.getElementById('root'));
root.render
(<React.StrictMode>
<App/>
<Header/>
<Menu/>
<Footer/>
</React.StrictMode>

);