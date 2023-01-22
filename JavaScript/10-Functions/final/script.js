'use strict';

/*
//Passing default parameter

const bookings = [];
const createBooking = function(flightNum, numPassengers = 1, price = 199 * numPassengers) {
    const booking = {
        flightNum, 
        numPassengers, 
        price
    }
    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 3);
createBooking('LH123', undefined , 400);

*/

/*
//Value vs Reference
const flight = 'LH234';

const puru = {
    name: 'Purushottam Kumar',
    passport: 253276723
}

const checkin = function(flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. '+passenger.name;
    if(passenger.passport === 253276723) {
        alert('Check In')
    } else alert('Wrong Passport');
}

checkin(flight, puru);
console.log(flight); // this is not changed because flightNum is a separate copy of flight
console.log(puru); //here puru.name is changed by function because it was memory address of object

*/

/*

//First Class and Higher order function

//First Class Functions --> just a concept
//Functions are just another type of object and treated as values

//We can store functions in variables
const add = (a, b) => a + b;

const counter = {
    value: 23,
    inc: function() { this.value++; }
}

//We can pass functions as arguments to other functions
const greet = () => console.log('Hey Puru');
btnClose.eventListener('click', greet);

//We can return a function from another function

//functions have methods
counter.inc.bind(someOtherObject);


//Higher order functions
//A function that recieves another function as an argument, that returns a new function, or both.
//this is only possible because of first class function
//Helps in abstraction --> Hides the detail of other function


//A function that recieves another function as an argument
const greets = () => console.log('Hey Puru');
btnClose.eventListener('click', greets);
//here eventListener is a higher order function function because it recieves greets as input
//here function greets passed as argument is called callback functionn


//Function that returns a new function
function count() {
    let counter = 0;
    return function() {
        counter++;
    };
}

*/


/*
//Function accepting callback function

//generic function 1 
const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
}

//generic function 2
const upperFirstWord = function(str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(" ");
}

//higher order function
const transformer = function(str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);

    //function method
    console.log(`Transformed by: ${fn.name}`);
}

transformer('javascript is best language', upperFirstWord);
transformer('javascript is best language', oneWord);

*/

/*

//Function returning function
const greet = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name} `);
    }
}

const greeterHey = greet('Hey');
greeterHey('Puru!');

greet('Hello')('Purushottam');

//using arrow function
const greeting = (msg) => { return (name) => { console.log(`${msg} ${name}!`); } }
greeting('Hlo')('PK');

const greetNew = msg => name => console.log(`${msg} ${name}!`);
greetNew('Hi')('Purushottam');

*/


/*

//FUNCTION METHODS

//The call and apply methods  --> allows us to manually set the this keyword in function call

const airAsia = {
    airline: 'Air Asia',
    iataCode: 'AA',
    bookings: [],

    // book: function() {}
    book(flightNumber, name){
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNumber}`);
        this.bookings.push({flight: `${this.iataCode}${flightNumber}`, name})
        
    }
};

airAsia.book(232, 'Purushottam Kumar');
airAsia.book(232, 'Shweta Kumari');


const goAir = {
    airline: 'GoAir',
    iataCode: 'GA',
    bookings: [],
};

const book = airAsia.book;

// book(13, 'Pk'); //will throw an error because the this keyword in the fuction is undefined, as the book function a regular function now.


//call method 

//call will solve the problem of this keyword  --> first argument is this keyword, and then rest of arguments needed
book.call(airAsia, 132, 'Shweta');
book.call(goAir, 132, 'Purushottam');

console.log(airAsia);
console.log(goAir);


//Apply method  --> It takes first argument as this keyword and then an array of arguments

const flightData = [123, 'Puru'];

book.apply(goAir, flightData);

book.call(goAir, ...flightData);



//Bind method --> It also allows us to manually set the this keyword in function call
//it does not immediately calls the function
//instead it return a new function where the this keyword is bound


//here book function will return a function whose 'this' keyword will always point to goAir object 
const bookGA = book.bind(goAir);
const bookAA = book.bind(airAsia);

bookGA(465, 'Shweta');
bookAA(865, 'PK');

const bookGA342 = book.bind(goAir, 342); //first argument of book function is already set, now we need only one argument --> 
//this is called partial application --> means a part of function is already applied
bookGA342('Manglii');


//With Event listeners
airAsia.planes = 300;
airAsia.buyNewPlane = function() {
    console.log(this);
    this.planes++;
    console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', airAsia.buyNewPlane); //here this keyword will point to the button element

document.querySelector('.buy').addEventListener('click', airAsia.buyNewPlane.bind(airAsia)); 
//using bind because eventListener needs a function as second argement and bind returns a function


//partial application
//many times we are not interested in 'this' keyword 

const addTax = (rate, value) => value + value * rate;

console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // same as addVAT= value => value + value * 0.23;

console.log(addVAT(100));


//create same above functionality --> but one function returning another function

const calculateTax = function(rate) {
    return function(value) {
        return value + value * rate;
    }
};

const calculateVAT = calculateTax(0.25);
console.log(calculateVAT(400));
console.log(calculateVAT(200));

*/

/*

//Challange --> my solution

const poll = {
    question: 'What is your favorite programming language ?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    answers: new Array(4).fill(0),

    multilineOptions(){
        let str='';
        for(const item of this.options){
            str+=(`${item}\n`);
        }
        return str;
    },

    registerNewAnswer() {
      const ans = Number(prompt(`${this.question}\n${this.multilineOptions()}(Write option number)`));
      if(ans >= 0 && ans <= 3){
        this.answers[ans] = this.answers[ans] + 1;
      }
     this.displayResult(undefined, this.answers);
    },
    displayResult(type = 'string', arr) {
        if(type === 'array'){
            console.log(arr);
        } else {
            let result = '';
            for(const answer of arr) {
                result += `${answer}, `;
            }
            result = result.slice(0, -2);
            console.log(`Poll results are: ${result}`);
        }
    },
};

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

const arr1 = [5,3,2];
const arr2 = [1,5,3,9,6,1];

poll.displayResult('string', arr1);
poll.displayResult('array', arr1);
poll.displayResult('string', arr2);
poll.displayResult('array', arr2);



//teacher's solution

const poll = {
    question: 'What is your favorite programming language ?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    answers: new Array(4).fill(0),

    registerNewAnswer() {
      const ans = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));
      
      typeof ans === 'number' && ans < this.answers.length && this.answers[ans]++;

     this.displayResult('string');
    },
    displayResult(type = 'array') {
        if(type === 'array'){
            console.log(this.answers);
        } else if(type === 'string'){
            console.log(`Poll results are: ${this.answers.join(', ')}`);
        } 
    },
};

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResult.call({answers: [5,3,2]});
poll.displayResult.call({answers: [5,3,2]}, 'string');

poll.displayResult.call({answers: [1,5,3,9,6,1]});
poll.displayResult.call({answers: [1,5,3,9,6,1]}, 'string');

*/

/*

//Immediately Invoked function expression --> //Function which runs once

(function () {
    console.log('This will not run again.');
})();

(() => console.log('This will also not run again.'))();

*/




/*

//Closures

const secureBooking = function () {
    let passengerCount = 0;

    return function() {
        passengerCount++;
        console.log(`${passengerCount} passenger`);
    }
}

const booker = secureBooking();

//Here when we are calling secureBooking function and storing its returning function in booker funcrtion ,....
//..... the passengerCount variable is no more available in execution context.. and hence it cannot be accessible by its returning variable
//but now when we call the booker function, it is able to access and increment the value of passengerCount variable.

booker();
booker();
booker();
//This is possible because of closures. Closures make functions remember the variable present at its birthplace.

//A function has access to the variable environment(VE) of the execution context in which it was created.
//Closure --> Variable Environment attached to the function, exactly as it was at the time and place the function was created.
        // or ... A closure is a closed-over variable environment of execution context in which function was created, even after that execution context is gone.
        // or ... A closure gives a function access to all the variables of its parents function, even after that parent function has returned, The function keeps a referrnce to its outer scope, which preserves the scope chain throughout the time.
// We do not manually create the closures. It is done by JavaScript automatically. We can't even access closed-over variable explicitely. A closure is not a tangible JavaScript Object.

// we can see where this closure is coming from, it is under scopes of function.
console.dir(booker);




//Closures Example 2 

let f;

const g = function() {
    const  a= 23;
    f = function() {
        console.log(a * 2);
    }
}
const h = function() {
    const  b = 223;
    f = function() {
        console.log(b * 2);
    }
}

g();
f(); // g() is already completed, still f() is able to access variable a
//Reassigning to f()
h();
f();
console.dir(g);
console.dir(f);
console.dir(h);




//Closures Example 2 

const boardPassengers = function(num, wait) {
    const perGroup = num / 3;
    
    setTimeout(function(){
        console.log(`We are now boarding all ${num} passengers.`);
        console.log(`There are 3 groups each with ${perGroup} passnegers`);
    }, wait* 1000);

    console.log(`Will start boarding in ${wait} seconds.`)
}
const perGroup = 200;
boardPassengers(180, 3); //closure has priority over scope chain, in this case we will get value of perGroup which is inside function not the outer one.

*/

//Challange 

(function() {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.querySelector('body').addEventListener('click', function(){header.style.color = 'blue';});
})();
