'use strict'
//use strict should be placed in top of the JS file --> It help us to write error free code
/*
let hasDriversLicense = false;
const passTest = true;

if(passTest) hasDriverLicense = true; //we are making an error intentionally --> this will not work but will also not throw any error in case of not using 'use strict' .... and will throw error when we are using use strict
if(hasDriversLicense) console.log("You can drive");


//---------------------------> Functions <---------------------------
//creating function
function logger() {
    console.log("My name is Purushottam");
}
//calling / invoking / running function
logger();
logger();
logger();

//Function declaration
function calcAge1 (birthYear) {
    return 2022-birthYear;
}

//Function Expression
const calcAge2 = function (birthYear) {
    return 2022 - birthYear;
}

const age1 = calcAge1(1997);
const age2 = calcAge2(1994);

console.log(`Function declaration : ${age1}`);
console.log(`Function Expression : ${age2}`);


//Arrow Function
//one parameter and one sentence
const calcAge3 = birthYear => 2022 - birthYear;
const age3 = calcAge1(1999);
console.log(`Arrow Function : ${age3}`);

//many parameter and many sentence
const yearsUntillRetirement = (birthYear, firstName )=> {
  const age = 2022 - birthYear;
  const retirement = 60-age;
  return `${firstName} retires in ${retirement} years.`;
}
console.log(yearsUntillRetirement(2000, 'Purushottam'));


//Calling function inside a function

const calcAge = birthYear => 2022 - birthYear;

const yearsLeftForRetirement = function (birthYear) {
  const age = calcAge(birthYear); //calling the function and storing the return value in a variable
  const retirement = 60-age;
  return `${retirement} years left for retirement`;
}
console.log(yearsLeftForRetirement(2000));

*/


//---------------------------> Arrays <---------------------------
/*
const friends = ['Himanshu', 'Mukesh', 'Kunal'];
console.log(friends);
console.log(friends[0]);
console.log(friends[2]);
//Number of elements in Array
console.log(friends.length);
//Access last element
console.log(friends[friends.length-1]);
//Replacing the element at a particular index
friends[2] = 'Sharad';
console.log(friends);

const years = new Array(2000, 2006, 2009, 2017, 2020);
console.log(years);


const firstName = 'Purushottam';
const puru = [firstName, 'Kumar', 2022-1997, 'Developer', friends];
console.log(puru);


const calcAge = function (birthYear) {
  return 2022-birthYear;
}
*/

//Array Methods
/*
const friends = ['Himanshu', 'Mukesh', 'Kunal'];
//Add element at last  --> array.push()
const newLength = friends.push('Sharad'); //push function also returns the new length of array
console.log(newLength);
//Add element at begining  --> array.unshift(value)
friends.unshift('Vivek');
console.log(friends);

//Remove last element
const popped = friends.pop();  //pop function returns the popped element
console.log(popped);
console.log(friends);

//Remove element at begining  --> array.shift()
friends.shift(); // will return the removed element
console.log(friends);

//Knowing the position if element
console.log(friends.indexOf('Himanshu'));

//check if an element is present in array or not
console.log(friends.includes('Himanshu')); //will return true is available else false
//array.includes uses strict rules and does not use type coersion
friends.push(23);
console.log(friends.includes('23')); //will return false
*/



//---------------------------> Objects <---------------------------
/*
const puru = {
  firstName: 'Purushottam',
  lastName: 'Kumar',
  age: 2022-1997,
  job: 'Developer',
  friends: ['Himanshu', 'Mukesh', 'Sharad']
};
//Retrieving and changing data of object
console.log(puru);
console.log(puru.lastName);
console.log(puru['lastName']); //brackets can accept expressions

const nameKey = 'Name';
console.log(puru['first'+ nameKey]);

const interestedIn = prompt('What do you want to know about puru ? Choose between firstName, lastName, age, job and friends.');
if(puru[interestedIn]) {
  console.log(puru[interestedIn]);
} else {
  console.log('Wrong request ! Choose between firstName, lastName, age, job and friends.');
}

//Adding propertiess to the object
puru.location = 'Bihar';
puru['twitter'] = '@itzpuru';
console.log(puru);

console.log(`${puru.firstName} has ${puru.friends.length} friends and his best friend is ${puru.friends[0]}.`);
*/


//Object Methods
/*
const puru = {
  firstName: 'Purushottam',
  lastName: 'Kumar',
  birthYear: 1997,
  job: 'Developer',
  friends: ['Himanshu', 'Mukesh', 'Sharad'],
  hasDriversLicense: true,
  /*
  calcAge: function(birthYear) {
    return 2022-birthYear;
  } //Any function that is attached to an object is called a method  --> it should be a function expression

  */
  /*
  calcAge: function() { //using the same birthYear defined in this object
    console.log(this); // this keyword points to current object
      return 2022-this.birthYear;
  }
  */
/*
  //Calculate and save in a variable in same object
  calcAge: function() { //using the same birthYear defined in this object
      this.age = 2022-this.birthYear; //This will create a new variable and assign value to it
      return this.age;
   },
  getSummary : function() {
    return `${this.firstName} is a ${this.calcAge()}-years ${this.job}. He has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`;
    }
};

//calling method (function) declared inside the object

//console.log(puru.calcAge(1997)); //for commented function
//console.log(puru['calcAge'](1997)); //for commented function

console.log(puru.calcAge());
console.log(puru.age);
console.log(puru.age);

console.log(puru.getSummary());

//Challenge #3
const mark = {
  name: 'Mark Miller',
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.bmi = (this.mass / this.height**2).toFixed(2);
    return this.bmi;
  }
};
const john = {
  name: 'John Smith',
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.bmi = (this.mass / this.height**2).toFixed(2);
    return this.bmi;
  }
};

if(mark.calcBMI() > john.calcBMI()) {
  console.log(`${mark.name}'s BMI (${mark.bmi}) is higher than ${john.name}'s BMI (${john.bmi})`);
} else if(john.calcBMI() > mark.calcBMI()) {
  console.log(`${john.name}'s BMI (${john.bmi}) is higher than ${mark.name}'s BMI (${mark.bmi})`);
} else {
  console.log(`${john.name}'s BMI (${john.bmi}) and ${mark.name}'s BMI (${mark.bmi}) are equal.`);
}
*/


//---------------------------> Loops <---------------------------

//for loop keeps running while condition is true
for(let rep =1; rep<=10; rep++) {
  console.log(`Lifting weights repetition ${rep}.`);
}

//looping through arrays
const puru = ['Purushottam', 'Kumar', 2022-1997, 'Developer', ['Himanshu', 'Mukesh', 'Sharad']];
const types = [];

for(let i = 0; i<puru.length; i++) {
  console.log(puru[i]);
  types.push(typeof(puru[i]));
}
console.log(types);


const years = [1994, 1997, 2000, 2004, 2006, 2007];
const age = [];

for (var i = 0; i < years.length; i++) {
  age.push(2022-years[i]);
}

console.log(age);

//continue and break 
//continue: to skip current iteration and move to next one
//break: to break the whole iteration
console.log('------ ONLY STRING ---------');
for(let i = 0; i<puru.length; i++) {
  if(typeof(puru[i]) !== 'string') continue; //if value is not a string it will skip the ieration and will not execute statements below it and will start the next iteration.
  console.log(puru[i], typeof(puru[i]));
}

console.log('------ BREAK WITH NUMBER ---------');
for(let i = 0; i<puru.length; i++) {
  if(typeof(puru[i]) == 'number') break; //if value occured is a number,It will stop iteration
  console.log(puru[i], typeof(puru[i]));
}


//Looping backwards in a loop
console.log('------ LOOPING BACKWARDS ---------');
for(let i = puru.length-1; i>=0; i--) {
  console.log(puru[i], typeof(puru[i]));
}

//Loop inside a loop
for(let exercise = 1; exercise<4; exercise++) {
  console.log(`---------- Starting Exercise ${exercise}`);
  for (var rep = 1; rep<6; rep++) {
    console.log(`Lifting weight repetition ${rep}`);
  }
}

//While loop
var rep = 1;
while(rep<6) {
    console.log(`Lifting weight repetition ${rep}`);
    rep++;
}

let dice = Math.trunc(Math.random() * 6 + 1);
console.log(dice);

while(dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6 + 1);
  if(dice == 6) console.log('Loop is about to end.....');
}




















