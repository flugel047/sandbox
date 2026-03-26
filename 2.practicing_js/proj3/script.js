'use strict'

// console.log(document.querySelector('.message').textContent); 
// document.querySelector('.message').textContent='Correct Number'; 
// document.querySelector('.number').textContent=13; 
// document.querySelector('.score').textContent=10; 
// console.log(document.querySelector('.guess').value=10)

let secNumber= Math.trunc(Math.random()*20+1);
console.log(secNumber);

let score=20;
document.querySelector('.score').textContent=score;
let highscore=0;


document.querySelector('.check').addEventListener('click',function(){
    const guess =Number(document.querySelector('.guess').value)
    console.log(typeof(guess));
    if(!guess)
    {
       document.querySelector('.message').textContent='Enter Number';  
    }
    else if(score===0)
    {
            document.querySelector('.message').textContent='You lost'; 
    }
    else if(guess===secNumber)
    {
            document.querySelector('.message').textContent='Correct Number'; 
            document.querySelector('.number').textContent=secNumber; 
            document.querySelector('body').style.backgroundColor='green';
            highscore=Math.max(highscore,score);
            document.querySelector('.highscore').textContent=highscore; 
    }
    else if(guess>secNumber)
    {
            document.querySelector('.message').textContent='Greater Number';   
            document.querySelector('.score').textContent=--score;   
    }
    else if(guess<secNumber)
    {
            document.querySelector('.message').textContent='Lesser Number';  
            document.querySelector('.score').textContent=--score;     
    }
    
})



document.querySelector('.btn').addEventListener('click',function(){
    score=20;
    document.querySelector('.score').textContent=20;
    document.querySelector('body').style.backgroundColor='#222';
    document.querySelector('.message').textContent='Start Guessing'; 
    document.querySelector('.number').textContent='?'; 
    secNumber= Math.trunc(Math.random()*20+1);
    console.log(secNumber);
    document.querySelector('.guess').value=null;
    console.log('working');
})