/*
// alert("Hello Moto!")

console.log("Purushottam");
console.log(27 + 27 + 12 - 12 - 2);

// ----------------------------> Variables and Values <----------------------------
let firstName = "Purushottam";
firstName = "Puru";
console.log(firstName);
console.log(firstName);
console.log(firstName);
console.log(firstName);
console.log(firstName);

// Variable naming convension --> can only contains letters, numbers or _ and $
//should start with alphabets or _ or $ and should not start with a number. should not start with capital letter
//should not use reserved javascript keywords (example - new, function )
//constant value's variable name should be in uppercase
//we should make the variable name descriptive
let first;
first = "Purushottam";
let firstNamePerson; //preferred in Javascript
let first_name;
let _firstName;
let $first_Name;
let test123;

let $ = 1;
// declared a variable with the name "$"
let _ = 2;
// and now a variable with the name "_"
alert($ + _); // 3

//define multiple variables
let user = "John",
  age1 = 25,
  message = "Hello";

//Assignment
// 1.Declare variables called 'country', 'continent'and 'population'and assign their values according to your own country(population in millions)
let country = "India";
let continent = "Asia";
let population = 1400;

// 2.Log their values to the console
console.log(country);
console.log(continent);
console.log(population);
*/

// ----------------------------> Constants <----------------------------
/*
//To declare a constant (unchanging) variable, use const instead of let
const myBirthday = "18.04.1982";
const yourBirthday = "18.04.1982";
// yourBirthday ='01.01.2001';// error, can't reassign the constant!
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
*/

// ----------------------------> Data Types <----------------------------
/*
//In JavaScript all values are into two categories --> Object and Primitive

//Primitive
//There are seven basic data types in JavaScript

//1 A number - The number type represents both integer and floating point numbers
let n = 123;
n = 12.345;

//2 A string - A string in JavaScript must be surrounded by quotes
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed ${str}`;

//3 A boolean (logical type)  -- The boolean type has only two values: true and false.
let nameFieldChecked = true; // yes, name field is checked
let ageFieldChecked = false; // no, age field is not checked

//4 The “null” value -- The special null value does not belong to any of the types described above
//It’s just a special value which represents “nothing”, “empty” or “value unknown”
let age = null;

//5 The “undefined” value -- The special value undefined also stands apart. It makes a type of its own, just like null.
//The meaning of undefined is “value is not assigned”
let x;
alert(x); // shows "undefined"

//6 Symbol -- not that useful

//7 BigInt -- Large numbers
console.log(typeof true);
*/

// ----------------------------> Basic Operators <----------------------------
/*
//Arithmatic Operators
const now = 2022;
const agePuru = now - 1997;
const ageShweta = now - 1997;
console.log(agePuru, ageShweta);
console.log(agePuru * 2, agePuru / 10, 2 ** 3);

const firstName = "Purushottam";
const lastName = "Kumar";
console.log(firstName + " " + lastName);

//Assignment Operator
let x = 10 + 5; //15
x += 10; //  x = x+10; --> 15+10 -->25
x *= 5;
x /= 2;
x++; // x = x+1;
x--; //x = x-1;
console.log(x);

//Comparison Operator
console.log(agePuru > ageShweta);
console.log(agePuru >= ageShweta);
console.log(agePuru < ageShweta);
console.log(agePuru <= ageShweta);
console.log(agePuru == ageShweta);
console.log(agePuru >= 18);
const isFullAge = agePuru >= 18;
*/

// ----------------------------> Operator Precedence <----------------------------
/*
const now = 2022;
const agePuru = now - 1997;
const ageShweta = now - 1997;

console.log(now - 1997 > now - 1994); //math operation completed before comparison operator
*/

// ----------------------------> Coding Challange #1 <----------------------------
/*
Mark and John are trying to compare their BMI (Body Mass Index), 
which is calculated using the formula:BMI = mass / height ** 2 = mass / (height * height)(mass in kg and height in meter).
Your tasks:
1.Store Mark's and John's mass and height in variables
2.Calculate both their BMIs using the formula (you can even implement both versions)
3.Create a Booleanvariable 'markHigherBMI'containing information about whether Mark has a higher BMI than John.

Test data:
§Data1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
§Data2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall


const massMark = 78,
  heightMark = 1.69,
  massJohn = 92,
  heightJohn = 1.95;
const bmiMark = massMark / heightMark ** 2;
const bmiJohn = massJohn / heightJohn ** 2;
const markHigherBMI = bmiMark > bmiJohn;
console.log(markHigherBMI);
*/

// ----------------------------> Strings and Template Literals <----------------------------
