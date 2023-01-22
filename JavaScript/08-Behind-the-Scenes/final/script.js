'use strict';

//High level overview of JavaScript

//  ---------------------> High Level <-----------------------
/* No need to manage resources*/

//  ---------------------> Garbage Collected <-----------------------
/* Automatically removes all unused objects from computer memory*/

//  ---------------------> Interpreted or Just-in-time compiled <-----------------------
/* Compilation happens inside Javascript Engine*/

//  ---------------------> Multi paradigm <-----------------------
/* Paradigm : An approach of structuring the code which will direct your coding style and technique 
1. Procedural programming 
2. Object-oriented programming
3. Functional programming
*/

//  ---------------------> Prototype-based Object-oriented <-----------------------
/* Almost everything in Javascript is an object except of some concepts like premitive values */

//  ---------------------> First-class functions <-----------------------
/* Function are treated just as regular variables, we can pass functions into another function and even return a function into another function */

//  ---------------------> Dynamic <-----------------------
/* We don't assing data types to the variables in JavaScript, Type of variables easily change as we reassign variables*/

//  ---------------------> Single threaded <-----------------------
/* How the javascript engine handles multiple tasks happening at the same time
Javascript runs in one thread, so it can do only one thing at a time. */

//  ---------------------> Non-blocking event loop <-----------------------
/* The event loops takes long running task and excutes them in the background and puts them back to main thread when it is completed */







//The Javascript Engine and Runtime
/* Javascript Engine: Program that excutes JS code. Popular JS engine: V8 (Google Chrome + Node JS)
JS engine always contains: 1. Call Stack    2. Heap
1. Call Stack : Where our code is executed using execution context
2. Heap : Unstructured memory pools that stores all the objects that our application needs.

//Compilation vs Interpretation
Compilation : Entire code is converted into machine code at once, then this machine code is writtem onto a portable file which can be executed by a computer
		Source Code -----compiled---->   Portable file (Machine code)  ----execution-----> Program Running

Interpretation : Interpreter runs through the source code and executed the code line by line.
		source code -------------read convert to machine code and execution at same time----------------> Program running

JavaScript use mix of Compilationa fn Interpretation which is valled just-in-time compilation 
Just-in-time compilation : Entire code is converted into machine code at once and then executed immediately
				Source Code -----compiled---->   Machine code (without creating portable file)  ----execution-----> Program Running
*/

/*
//Runtime in the browser
Runtime: A big container which includes all the things that are needed in JavaScript
		 heart of JS runtime is JS Engine

Runtime include: JS Engine, Web APIs, Callback Queue
JS Engine : JS engine contains: 1. Call Stack    2. Heap
Web APIs : Functionality provided to the engine, accesible on window object (DOM, Timers, Fetch API, ....)
Callback Queue: Callback funtions from DOM event listener (Click, timer, data, ....) Added to Call Stack by event loop when DOm is called

*/





/* 
JS code always runs inside execution context
Execution Context: Environment in which a piece of JS is executed. Stores all the necessary information for some code to be executed.
					There is only one global execution context of all JS code, created for code that is not inside any function


Compilation --> creation of global execution context(for top level code, not code inside function (functions get their own execution context)) --->  Execution of top-level-code --> Execution of cunctions and waiting for callbacks



//What is inside Execution Context
1. Variable Environment : let, const, var decleration
						  functions
						  Argument objects

2. Scope Chain 
3. this keyword
(all of above during creation phase right before execution)

*/




/*
//Scope and Scope Chain 
Scoping: Controls how our program's variables are organised and accessed. where di variable live or where can we access the variable and where not
Scope : 1. Global Scope 
		2. Function scope
		3. Block scope


//This keyword

console.log(this);
//Value of this is Regular function
const calcAge = function (birthYear) {
	console.log(2022 - birthYear);
	console.log(this);
}

calcAge(1997);

//value of this in Arrow function
const calcAgeArrow = birthYear => {
	console.log(2022 - birthYear);
	console.log(this);
}

calcAgeArrow(1997);

//Value of this in Calling methods
const puru = {
	year: 1997,
	calcAge: function() {
		console.log(this);
		console.log(2022 - this.year);
	}
}

puru.calcAge();

*/


const puru = {
	firstName: 'Purushottam',
	year: 1997,
	calcAge: function() {
		console.log(this);
		console.log(2022 - this.year);
	},

	greet: () => console.log(`Hey ${this.firstName}`),
}
//Arrow function takes value of this from its surroundings, in this case, greet is parent of 'this' and greet will take value of this from global scope because greet is not inside any block, but an object literal
puru.greet();









