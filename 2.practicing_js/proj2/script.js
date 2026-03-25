'use strict'
console.log('no face')

function logger(){
    console.log('My name is Jonas');
}

logger();

function cutPieces(fruit)
{
    return fruit*5;
}

function fruitProcessor(apples,oranges)
{
    let applesSlices= cutPieces(apples);
    let orangeSlices=cutPieces(oranges);
    let juice= `Yo we got those ${applesSlices} apples and ${orangeSlices} oranges for the juice`;
    return juice;
}

let glassJuice= fruitProcessor(10,20);
console.log(glassJuice);
console.log(fruitProcessor(700,600));

//arrays

const friends= ['john','mike','kelly'];
friends.unshift('jim');
console.log(friends);
console.log(friends.indexOf('mike'));

//objects

const details= {
    firstName:'Jonas',      //property 1
    lastName:'Kanhwald',   //property 2
    jobs:['Miner'],          //property 3
    friends:['mikel','john','jesse','rob'],
    birthYear:2000,
    calcAge: function()
    {
        return 2026-this.birthYear;
    }
}

console.log(details);
console.log(details.firstName);

const nameKey='Name';
console.log(details['last'+nameKey]);
console.log(`Jonas has ${details.friends.length} friends and ${details.friends[0]} is his best friend`);
console.log(details.calcAge());

//loops
let rep=1;
for(rep=1;rep<=10;rep++)
{
    console.log(`I did ${rep} rep today`);
}

// random function

let dice= Math.random()*6;
console.log(dice);
for(let i=0;i<=6;i++)
{
    
dice=Math.trunc(Math.random()*6)+1;
console.log(dice);

}
//array prob

let bills=[22, 295, 176, 440, 37, 105, 10, 1100, 86,52];
let tipValue= new Array(10);
for(let i=0;i<bills.length;i++)
    {
        tipValue[i]=50<bills[i] && bills[i]<300 ?  0.15*bills[i] : 0.20*bills[i] ;
        console.log(`The bill was ${bills[i]}, the tip was ${Math.trunc(tipValue[i])}, and the total value ${bills[i]+Math.trunc(tipValue[i])}`);
    }

