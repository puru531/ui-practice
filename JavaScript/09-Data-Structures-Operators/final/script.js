'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


// Data needed for first part of the section

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
    [weekdays[3]]: {
      open: 12,
      close: 22,
    },
    [weekdays[4]]: {
      open: 11,
      close: 23,
    },
    [weekdays[5]]: {
      open: 0, // Open 24 hours
      close: 24,
    },
  };

/*

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  //ES6 Enhanced Object Literal
  openingHours,

  //ES6 Creating methods inside objects
  orderDelivery({starterIndex=1, mainIndex=2, time='20:00', address}) {
    console.log(`Order recieved ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`);
  },

  orderPizza(mainIngredient, ...OtherIngredients) {
    console.log(mainIngredient);
    console.log(OtherIngredients);
  }

};
*/
// console.log(restaurant);

/*
//Destructuring array --> Assigning separate values to separate variables 
const arr = [1,2,3];
const a = arr[0];
const b = arr[1];
const c = arr[2];


const [x,y,z] = arr;
console.log(x,y,z);

let [first, , third] = restaurant.categories; //will skip the second one
console.log(first, third);

//Swapping values
// const tmp = first;
// first = third;
// third = tmp;
// console.log(first, third);

//Swapping values by Destructuring Array
[third, first]=[first, third]
console.log(first, third);

console.log(restaurant.order(2,0));
const [starter, main] = restaurant.order(2,0);
console.log(starter, main);

//nested array
const nested = [2,4, [3,9]];
const [i, , j] = nested;
console.log(i, j);
const [p, , [q,r]] = nested;
console.log(p,q,r);

//Defalt values 
const [m=1,n=1,o=5]=[8,9];
console.log(m,n,o);
*/

/*
//Destructuring Objects
// Since in an object, the order of element does not matter, we need to provide same variable name as properties, the object already have.

const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

//if we want variable names to be different from property name :
const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
console.log(restaurantName, hours, tags);

//Setting default values
const {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);

//Mutating variables
let a= 111;
let b = 121;
const obj = {a: 23, b: 43, c:9};
({a,b} = obj);
console.log(a,b);


//Destructuring nested Objects
const {fri} = restaurant.openingHours;
console.log(fri);

const {fri: {open: o, close: c}} = restaurant.openingHours;
console.log(o, c);

restaurant.orderDelivery({
  time: 23,
  address: 'Rampur',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Kanan',
  mainIndex: 0,
});

*/



/*

//The Spread Operator (...)
const arr = [3,8,9];
const badNewArr = [1,2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1,2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = ['Gnocci', ...restaurant.mainMenu];
console.log(newMenu);


//copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);
//Join two arrays
const combinedMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(combinedMenu);

// Spread operator works on all iterables: (arrays, strings, maps, sets) not objects
const str = 'Purushottam';
const letters = [...str,' ', 'S'];
console.log(...str);
console.log(letters);

//Examples
// const ingredients = [prompt('Let\'t make Pasta! Ingredient 1?'), prompt('Ingredient 2?'), prompt('Ingredient 3?')];
const ingredients = ['Corn', 'Cheese', 'Mashroom'];
console.log(ingredients);

restaurant.orderPasta(...ingredients);


//Objects
const newRestuarant = {foundedIn: 2024, ...restaurant, founder: 'Mukesh'};
console.log(newRestuarant);

const restuarantCopy = {...restaurant};
restuarantCopy.name = 'Ristorante Roma';
console.log(restuarantCopy.name);
console.log(restaurant.name);
*/


/*

//SPREAD -- Because ... is in the right side of the assignment operator
const arr1 = [1, 2, ...[3, 4], 6];
console.log(arr1); //--> [1,2,3,4,6]

//REST operator 

//Rest operator because ... is at left side of =
const [a, b , ...others] = [1,2,3,4,5,6];
console.log(a, b, others);

const [piz, , ris, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(piz, ris, otherFood);

//Rest in Objects
const {sat, ...weekdays} = restaurant.openingHours;
console.log(sat);
console.log(weekdays);

// Rest in Functions
const add = function(...numbers) {
  let sum = 0;
  for(let i = 0; i<numbers.length; i++) sum+= numbers[i];
  console.log(sum);
}
add(2,3);
add(2,3,5,6,7);
add(7,2,3,3,5,5,6,7,8,8,9);

const x = [5,5,6,7,8,8];
add(...x);

restaurant.orderPizza('mashroom', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mashroom');

*/


/*
//Short Circuitting (&& and ||)
// && and || use any dataType and return Any dataType

console.log('------- OR --------');

console.log(2 || 'Puru'); //if the first value is truthy value then it immediately return first value and don't go to look for second value
console.log('' || 'Puru');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

const guests = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests);

const guests1 = restaurant.numGuests || 10;
console.log(guests1);


console.log('------- AND --------');
console.log(0 && 'Puru'); //opposite of OR operator, immediatelly returns false if first value is falsy, without checking next value
console.log(7 && 'Puru'); //it checks first value, it is true, check next, it is also true then returns it
console.log('Hello' && 23 && null && 'Puru'); //it becomes falsy at null, so it will retun null

if(restaurant.orderPizza) {
  restaurant.orderPizza('mahsroom', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mahsroom', 'spinach');

*/

/*

//Nullish Coalescing Operator (??)
//Nullish values --> null and Undefined (does not include 0 or '')
restaurant.numGuests = 0; //will assign 10 if we check with || operator
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

const guests3 = restaurant.numGuests ?? 10;
console.log(guests3);

*/


/*

//Logical Assigment Operator

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

//OR Logical Assignemnt
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||=10;
// rest2.numGuests ||=10;

//Nullish Logical Assignemnt
rest1.numGuests ??=10;
rest2.numGuests ??=10;

//AND Logical Assignemnt
// rest1.owner = rest1.owner && '<ANONYMOUS>'; //will return undefined if it is not available
rest1.owner &&= '<ANONYMOUS>'; //if it is available then change it
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);

*/

/*

//FOR-OF loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for(const item of menu) console.log(item);

for(const item of menu.entries()) console.log(item);

for(const item of menu.entries()) console.log(`${item[0] + 1}: ${item[1]}`);

for(const [i, el] of menu.entries()) console.log(`${i + 1}: ${el}`);

*/


/*
//Optional Chaining
//If any property does not exist, then undefined is returned immediately

if(restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open);

if(restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);


//with optional chaining
//if monday exist or not not check, if yes then only go to open
console.log(restaurant.openingHours.mon?.open);

console.log(restaurant.openingHours?.mon?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for(const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed'; 
  console.log(`On ${day} we open at ${open}`);
}


//Methos

console.log(restaurant.order?.(0,1) ?? 'Method Does not exists.');

//Arrays
const users = [
  {
    name: 'Puru',
    email: 'Purushottam1619@gmail.com'
  }
];
console.log(users[0]?.name ?? 'User Array empty')

*/


/*

//Looping Objects: Objects Keys, Values, and Entries

//property names
const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days : `;
for (const day of properties) openStr += `${day}, `;
console.log(openStr);


for (const day of Object.keys(openingHours)) console.log(day);


//property values
const values = Object.values(openingHours);
console.log(values);

//Entries --> Property Name + Value  (Entire Object)

const entries = Object.entries(openingHours);
console.log(entries);

for(const [key, {open, close}] of entries) {
  console.log(`On ${key}, we open at ${open} and close at ${close}`);
}

*/


/*

//SETS --> Collection of Unique Values
const orderSet = new Set(['Pasta', 'Pizza', 'Risotto', 'Pizza', 'Pasta']);
console.log(orderSet);

console.log(new Set('Purushottam').size);

console.log(orderSet.size);
console.log(orderSet.has('Bread'));
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread'); //only one will be added

orderSet.delete('Risotto');
console.log(orderSet);

for(const order of orderSet) console.log(order);


orderSet.clear();
console.log(orderSet);

//Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);


console.log(new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size);

*/


/*


//MAPS  --> Map values to keys (stored in key value pairs)
//Inobject the keys should be string but in MAPS the keys can be of any type

const rest = new Map();
rest.set('name', 'Calssico Iraliano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']).set('open', 11).set('close', 23).set(true, 'We are open').set(false, 'We are closed');


console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time =9;
console.log(rest.get(time >= rest.get('open') && time < rest.get('close')));


console.log(rest.has('categories'));
rest.delete(2);
console.log(rest);
console.log(rest.size);
rest.clear();
console.log(rest);

const arr2 = [1,2];
rest.set(arr2, 'Test');
console.log(rest.get(arr2));

rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);



const question = new Map([
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'Javascript'],
    ['Correct', 3],
    [true, 'Correct'],
    [false, 'Try Again'],

  ]);

console.log(question);

//Convert Objects to Map
console.log(Object.entries(openingHours)); //It returns array of arrays which can be converted like above example
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if(typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt('Ypur Answer : '));
const answer = 3;

console.log(answer);

console.log(question.get(question.get('Correct') === answer))


//Convert Map to array
console.log(...question);
const arr3 = [...question];
console.log(arr3);


console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);

*/


//STRINGS


const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log(plane[3]);

console.log('B737'[0]);
console.log(airline.length);
console.log('B737'.length);

//Methods
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Air'));
console.log(airline.indexOf('air'));

console.log(airline.slice(4)); // .slice(beginParameter, End Parameter)
console.log(airline.slice(4, 7)); // 4 to 6 (7-4 = 3 characters)

console.log(airline.slice(0, airline.indexOf(' '))); //Printing first word
console.log(airline.slice(airline.lastIndexOf(' ')+1)); //Printing last word

console.log(airline.slice(-2));

console.log(airline.slice(1,-1));


//example
const checkMiddleSeat = function(seat) {
  //b and E are middle seats
  const s = seat.slice(-1);
  if(s === 'B' || s === 'E')
    console.log('You got middle seat');
  else console.log('You got lucky');
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

//Methods
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());


//Example --> Fix capitalization in name
const passenger ='puRu'; // --> Puru
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);


// comparing email

const email = 'hello@puru.io';
const loginEmail = '    Hello@PuRu.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmerEmail = lowerEmail.trim();
// console.log(trimmerEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);


//replacing 
const priceGB = '288,97&';
const priceUS = priceGB.replace('&', '$').replace(',', '.');
console.log(priceUS);

const announcement = 'All passengers come to barding door 23. Boarding door 23!';

// console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replaceAll(/door/g, 'gate')); // A regular expression to check all occurances of door

//Boolean
const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A320'));
console.log(plane2.includes('Boeing'));
console.log(plane2.startsWith('Air'));

if(plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('Part of the New Airbus family');
}


//Example
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if(baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome abroad!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket knife');
checkBaggage('Socks and Camera');
checkBaggage('Got some snacks and a gun for protection');








































//===================== Promises
/*
let promise = new Promise((resolve, reject) => {
  setTimeout(() =>{
    resolve ('Data Recieved')
  }, 3000)
});

//async keyword with function always returns a promise
async function getData() {
  let response = await promise;
  console.log(response);
}

getData();



let result1 = document.getElementById('result1');
let result2 = document.getElementById('result2');
let result3 = document.getElementById('result3');

//Ex-1 : With promise

let dell = {
  brand: 'Dell',
  hardDisk: '2 TB',
  color: 'black'
}

let buyLaptop = new Promise((resolve, reject) => {
  setTimeout(() =>{
    resolve (dell)
  }, 3000)
});

let buyLaptop2 = fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json());

function fetch1() {
  result1.innerHTML = 'Fetching Data...';

  buyLaptop.then(res => {
    result1.innerHTML = JSON.stringify(res);
  })
}

//Ex-2 : With Async/Await

async function fetch2() {
  result2.innerHTML = 'Fetching Data...';
  let data = await buyLaptop;
  result2.innerHTML = JSON.stringify(data);
}


//Ex-2 : With fetch Api

//Promise
// function fetch3() {
//   result3.innerHTML = 'Fetching Data...';

//   buyLaptop2.then(res => {
//     result3.innerHTML = JSON.stringify(res);
//   });
// }

//Async/Await
async function fetch3() {
  result3.innerHTML = 'Fetching Data...';

  let res = await buyLaptop2;
  result3.innerHTML = JSON.stringify(res);
}

*/