'use strict'

//Slecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll')
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold');


//starting contions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0,0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
}
//Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if (playing) {
        //1. Generating a random  dice roll
        const dice = Math.trunc(Math.random() * 6 ) + 1;

        //2. Display dice0
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`

        //3.  Check for rolled 
        if(dice !== 1){
            //add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            
        } else {    
            //1: if true, switch to next player
            switchPlayer();
        }
    }
})

//Holding score functionality
btnHold.addEventListener('click', function () {
    if(playing) {
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. check if player's score is >= 100
        if(scores[activePlayer] >= 100){
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        }else {
            //3. Swith to the next player
            switchPlayer();
        }
    }
});
