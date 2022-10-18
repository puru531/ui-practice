'use strict';

const player0Elmt = document.querySelector('.player--0');
const player1Elmt = document.querySelector('.player--1');
const score0Elmt = document.querySelector('#score--0');
const score1Elmt = document.getElementById('score--1');
const current0Elmt = document.getElementById('current--0');
const current1Elmt = document.getElementById('current--1');
const diceElmt = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

score0Elmt.textContent = 0;
score1Elmt.textContent = 0;
diceElmt.classList.add('hidden');

const scores = [0,0];
let currentScore = 0;
let activePlayer = 0;

const changeActivePlayer = function () {
	currentScore = 0;
	document.getElementById(`current--${activePlayer}`).textContent = currentScore;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0Elmt.classList.toggle('player--active');
	player1Elmt.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
	//Generating a random dice roll
	const dice = Math.trunc(Math.random()*6) + 1;

	//Display dice
	diceElmt.classList.remove('hidden');
	diceElmt.src = `dice-${dice}.png`;

	//Check for rolled 1: if true switch to next player
	if(dice !== 1) {
		//Add dice value to current score
		currentScore+= dice;
		document.getElementById(`current--${activePlayer}`).textContent = currentScore;
	} else {
		//make current score zero of current player and Switch to next player
		changeActivePlayer();
	}

});

btnHold.addEventListener('click', function() {
	scores[activePlayer] += currentScore;
	document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
	if(scores[activePlayer] >= 100) {
		// document.querySelector(`.player--${activePlayer}`).classList.add('player-winner');
		// document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
		document.getElementById(`score--${activePlayer}`).textContent = 'You win!';
		btnRoll.classList.add('hidden');
		btnHold.classList.add('hidden');
		diceElmt.classList.add('hidden');
	} else changeActivePlayer();
});

btnNew.addEventListener('click', function () {
	activePlayer = 0;
	currentScore = 0;
	scores[0] = 0;
	scores[1] = 0;
	player1Elmt.classList.remove('player--active');
	player0Elmt.classList.add('player--active');
	current0Elmt.textContent = currentScore;
	current1Elmt.textContent = currentScore;
	score0Elmt.textContent = 0;
	score1Elmt.textContent = 0;
	diceElmt.classList.add('hidden');
	btnRoll.classList.remove('hidden');
	btnHold.classList.remove('hidden');
});