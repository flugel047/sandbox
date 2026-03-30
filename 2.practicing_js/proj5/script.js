'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map,mapEvent;

navigator.geolocation.getCurrentPosition(function(posistion){
    console.log('posistion loaded')
    const {latitude}=posistion.coords;
    const {longitude}=posistion.coords;
    console.log(`latitude: ${latitude}, longitude: ${longitude}`);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    const coords=[latitude,longitude];

    map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    

    map.on('click',function(eventM){
        mapEvent=eventM;
        form.classList.remove('hidden');
        inputDistance.focus();
        console.log(eventM);

        
        
    });
},
function(){
    console.log('navigator failed');
})

form.addEventListener('submit',function(e){
    e.preventDefault();
    const{lat,lng}=mapEvent.latlng

        L.marker([lat,lng]).addTo(map)
        .bindPopup(L.popup({
            maxWidth:250,
            minWidth:100,
            autoClose: false,
            closeOnClick: false,
            className:'running-popup',
        })).setPopupContent('workout')
        .openPopup();
        
})

inputType.addEventListener('change',function(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
});