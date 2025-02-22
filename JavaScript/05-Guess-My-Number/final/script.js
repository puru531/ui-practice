'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct Number!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 20;

document.querySelector('.guess').value = 2;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highscore = 0;
const displayMessage = function (message) {
	document.querySelector('.message').textContent = message;
}
//addEventListener takes two arguments one is event to occur and 2nd is the eventHandler which should be a function to handle the event, that what it will be doing 
document.querySelector('.check').addEventListener('click', function() {
	const guess = Number(document.querySelector('.guess').value);

	//When there is no input
	if(!guess) {
		// document.querySelector('.message').textContent = 'No Number!';
		displayMessage('No Number!');
	} //When player wins
	else if (guess === secretNumber) {
		// document.querySelector('.message').textContent = 'Correct Number!';
		displayMessage('Correct Number!');
		document.querySelector('.number').textContent = secretNumber;
		document.querySelector('body').style.backgroundColor = '#60b347';
		document.querySelector('.number').style.width = '30rem';
		if(highscore<score) {
			highscore = score;
		}
		document.querySelector('.highscore').textContent = highscore;
	}//When guess is less or high
	else if (guess !== secretNumber) {
		if(score>1) {
			// document.querySelector('.message').textContent = guess < secretNumber ? 'too low!' : 'too high!';
			// guess < secretNumber ? displayMessage('too low!') : displayMessage('too high!');
			displayMessage(guess < secretNumber ? 'too low!' : 'too high!');
			score--;
			document.querySelector('.score').textContent = score;
		} else {
			// document.querySelector('.message').textContent = 'You lost the game!';
			displayMessage('You lost the game!');
			document.querySelector('.score').textContent = 0;
		}
	}
});

document.querySelector('.again').addEventListener('click', function() {
	score = 20;
	secretNumber = Math.trunc(Math.random()*20)+1;
	document.querySelector('.score').textContent = score;
	document.querySelector('.guess').value = '';
	document.querySelector('body').style.backgroundColor = '#222';
	document.querySelector('.number').style.width = '15rem';
	// document.querySelector('.message').textContent = 'Start guessing...';
	displayMessage('Start guessing...');
	document.querySelector('.number').textContent = '?';
});