'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsShowModal = document.querySelectorAll('.show-modal'); //Array of all the elements will get stored in the variable 
console.log(btnsShowModal); 

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

const showModal = function () {
		modal.classList.remove('hidden');
		overlay.classList.remove('hidden');
	};

for(let i = 0; i < btnsShowModal.length; i++)
	btnsShowModal[i].addEventListener('click', showModal);


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//Responding to keyboard events --> keydown is for pressing and leaving key immediately
document.addEventListener('keydown', function (e) {
	if(e.key === 'Escape' && !modal.classList.contains('hidden') && !overlay.classList.contains('hidden')) closeModal();
});