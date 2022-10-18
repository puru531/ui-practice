'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderDelivery: function({starterIndex=1, mainIndex=2, time='20:00', address}) {
    console.log(`Order recieved ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`);
  }

};


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


//SPREAD -- Because ... is in the right side of the assignment operator
const arr1 = [1, 2, ...[3, 4], 6];
console.log(arr1); //--> [1,2,3,4,6]





















































