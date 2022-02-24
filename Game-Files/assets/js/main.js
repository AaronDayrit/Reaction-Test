"use strict";

// Manitoba Institute of Trades and technology
// JavaScript Basics
// Aaron Dayrit

const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start');

const waitingScreen = document.getElementById('waiting-screen');

const clickScreen = document.getElementById('click-screen');
const clickOverlay = document.getElementById('click-overlay');

const continueScreen = document.getElementById('continue-screen');
const time = document.getElementById('time');
const pbContainer = document.getElementById('pb');
const retry = document.getElementById('retry');

const screenArr = [startScreen, waitingScreen, clickScreen, continueScreen];

// https://mixkit.co/free-sound-effects/game/
const ring = new Audio('assets/audio/finish.wav');
const beeping = new Audio('assets/audio/beeping.wav');
const bigBeep = new Audio('assets/audio/bigBeep.wav');

let initialTime = 0;
let finalTime = 0;
let pb = 0;
let final = 0;

let firstTry = true;

startBtn.addEventListener('click', () => {
    play();
});

retry.addEventListener('click', () =>{
    play();
});

clickOverlay.addEventListener('click', () =>{
    finalTime = new Date();
    final = finalTime - initialTime;
    off();
    on(continueScreen);
    time.innerText = `${final} ms`;

    /*---------------------------------
        Score changer
    ---------------------------------*/

    if(firstTry === true){
        pb = final;
        pbContainer.innerText = `Personal best: ${final}ms`;
    }else{
        if(final < pb){
        pb = final;
        pbContainer.innerText = `Personal best: ${final}ms`;
        }
    }
    
    firstTry = false;
    setTimeout(() => { ring.play() }, 1200);
});

/*-------------------------------------------
    Functions
-------------------------------------------*/

const off = () => {
    for(let property in screenArr){
        screenArr[property].classList.add('off');
    }
};

const on = (screen) => {
    screen.classList.remove('off')
};

const play = () => {
    off();
    on(waitingScreen);
    beeping.currentTime = 0;
    beeping.play();

    let randomNum = Math.floor(Math.random() * (7 - 4 + 1) + 4) * 1000;
    setTimeout(() => {
        beeping.pause();
        bigBeep.play();
        off();
        on(clickScreen);
        initialTime = new Date();
    }, randomNum);
  
};
