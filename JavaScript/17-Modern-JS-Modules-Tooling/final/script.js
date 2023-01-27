/*
JS codes are build into several different modules, that even includes third party modules. 
After that code of all files/modules is built using NPM(Node Package Manager) --> making one JS bundle containing all codes of all modules.
after that NPM Transpiles/Polyfills the code --> Convert modern Javascript into ES5 code --> so that every browser can support.  (Using a tool called Babel)
After that, the JAvascript bundle is ready to deploy to the server 

Tools used to do above said steps : Webpack(little hard, need manual configuration) or PARCEL(easy, zero configuration) --> Called JavaScript bundlers
*/


////////////////////////////////////////////////////////////////////////////////////////////////
///--------------->  MODULES IN JAVASCRIPT   <--------------------
/*
Module is a reusable piece of code that encapsulates implementation details. It is usually a standalone file.(not necessarily)

The module which we import in a module is known as dependency
The module which we export is known as public API

Advantages:
Modules help in making complex softwares: Modules are small building blocks that we put together to make complex applications.
Isolate components: Modules can be developed in isolation, without thinking about entire codebase
Abstract code:
Organized code:
Reuse code:



// As of ES6, JavaScript has built in module system. ES6 modules are stored in files, one module per file.
                                       Module                                vs                          Script
1. Variables :                     scoped to module.                                           All top level variables are global.
2. Default mode :                  Strict mode                                                 "Sloppy" mode
3. This keyword at top level :     undefined                                                   window
4. Export/import values :          Yes  (hoisted, always at top level)                          No
5. HTML linkings :                 <script type="module" src=" ">                               <script src=" ">"
6. File downloading :              Asynchronous                                                 Synchronous

----> index.js <-------
import { rand } from './math.js';
import { showDice } from './dom.js';
const dice = rand(1, 6, 2);
showDice(dice);

Here first JS will parse the index.js then it will make math.js and dom.js top level.
then math.js and dom.js will be imported sychronously(because of static top level imports).
and after that modules will be downloaded asynchronously and then parsed --> linked to index.js  --> executed 
Then only index.js will start execution.
*/

////////////////////////////////////////////////////////////////////////////////////////////////
///--------------->  IMPORTING MODULES   <--------------------
/*
//importing
import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
console.log("Importing Module");

//now we can use imported methods from shoppingCart module.
addToCart(5, 'Bread');
console.log(price, tq);

*/


//we can also import everything in one go by storing all values in an object
// console.log("Importing Module");
// import * as shoppingCart from './shoppingCart.js';

// shoppingCart.addToCart(5, 'Bread');
// console.log(shoppingCart.totalPrice);


//importing default export by any name
// import add from './shoppingCart.js';
// add(5, 'Pizza');

//we can default and named export
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js'; //not recommended
// add(5, 'Pizza');
// addToCart(5, 'Bread');
// console.log(price, tq);

//import has live connection with export, 
//from export file, we exported an empty array of cart, but when we add more items in cart, it will get updated. So exported cart is nut just an array.
import add, { cart } from './shoppingCart.js';
add(5, 'Pizza');
add(2, 'Burger');
add(3, 'Momos');

console.log(cart);  // o/p   0: {product: 'Pizza', quantity: 5} 1: {product: 'Burger', quantity: 2} 2: {product: 'Momos', quantity: 3}


////////////////////////////////////////////////////////////////////////////////////////////////
///--------------->  TOP LEVEL AWAIT [ES2022]   <--------------------
/*
//we csn now use await keyword outside of an async function function, called top level await. 
//Only works in modules---> blocks the execution of entire module.

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Some code getting executed after await, await blocking execution');


const getLastPost = async function() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    // console.log(data);

    return {title: data.at(-1).title, body: data.at(-1).body}
}

const lastPost = getLastPost();
console.log(lastPost);  //return promise ---> Promise {<pending>} ---> becuse we are storing data from async function

//solution 
// lastPost.then(last => console.log(last)); //not very clean

//we can use top level await
const lastPost2 = await getLastPost();
console.log(lastPost2); 

*/

////////////////////////////////////////////////////////////////////////////////////////////////
///--------------->  THE MODULE PATTERN   <--------------------
/*
//old way of module pattern, in order to encapsulate the varibles and values, function is best method.
//So in old ways of module pattern, function is used. and usually, IIFE (Immediately Invoked Function Expression) is used so that we don't need to call or invoke it

const shoppingCart2 = (function(){
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function (quantity, product) {
        cart.push({ product, quantity });
        console.log(`${quantity} ${product} added to cart.`);
        console.log(`shippingCost: ${shippingCost}`); //we will able to access it becuase closure help us o access the variable of the birthplace of methods.
      };
    const orderStock = function (quantity, product) {
        console.log(`${quantity} ${product} ordered from supplier.`);
      };

    //return the stuff wich you want to make public.
    return {addToCart, cart, totalPrice, totalQuantity}
})();

//now we can use it
shoppingCart2.addToCart(5, 'milk'); //here with addToCart function, we are able to modify cart, because closures help us to access that variable.
console.log(shoppingCart2); //shoppingCart2 is private to this module only, we cannot access it in global scope (ex. console)
console.log(shoppingCart2.shippingCost); //undefined --> we have not made it public, not returned from function

*/

////////////////////////////////////////////////////////////////////////////////////////////////
///--------------->  CommonJS Modules   <--------------------
/*
//CommonJS Modules has been used in Node.js from begining. (Recently ES6 Modules have been added to Node.js)
//In commonjs also, 1 file 1 module.


//will not work in browser, but will work in Node.js(Responsible for running JS code out of the browser)

//Export
export.orderStock = function (quantity, product) {
    console.log(`${quantity} ${product} ordered from supplier.`);
  };

//Import
const { addToCart } = require('./shoppingCart.js'); //require is not defined in our browser environment, but available in Node.js

*/
////////////////////////////////////////////////////////////////////////////////////////////////
///---------------> INTRODUCTION TO COMMAND LINE   <--------------------
/*
ls : list filef of current folder  --> windows : dir
cd .. : go to upper folder
clear : clear console
mkdir test : create directory/folder named test
touch index.html : create file named index.html ---> windows : edit index.html  (to create multiple files : touch index.html script.js .......so on)
rm index.html : remove file named index.html ---> windows : del 
mv index.html ../ :  move to parent <mv filename location>
rmdir test : remove folder named test (works for empty folders only)
rm -R test : remove folder including subfolders and files in it.
*/


////////////////////////////////////////////////////////////////////////////////////////////////
///---------------> INTRODUCTION TO NPM   <--------------------
//NPM : Node Package Manager.  It is both a software and a package repository.
/*
Why do we need NPM ?
Earlier we used to include external libraries in HTML using the script tag. This can create problems in managing in big projects.

npm -v : gives npm version if it is installed.
npm init : initialize npm in our project (will ask some questions for creating package.json.... if don't want to give anything keep pressing enter)
*/

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es'; //parcel will automatically find the path

const state = {
  cart : [
    {product : 'bread', quantity: 5},
    {product : 'pizza', quantity: 5},
  ],
  user : {loggedIn : true}
}

const stateClone = Object.assign({}, state);
stateClone.user.loggedIn = false; // it will change the value inside state object because of memory address location, but if want a cloned copy of object, it will take a lot of work, so we can use cloneDeep instead.
console.log(stateClone);

//Cloning a deep nested object
const stateDeepClone = cloneDeep(state); //COpied in a new object, and any change in one will not affect other.
console.log(stateDeepClone, 'using cloneDeep'); 


////////////////////////////////////////////////////////////////////////////////////////////////
///---------------> BUILDING WITH PARCEL AND NPM SCRIPTS   <--------------------
// npm i parcel --save-dev    //Installing a dev dependency
//npx parcel index.html       //builds the project     (index.html) --> location of file in which we are including module of js file 
//To run it with npm script, we need to specify command in package.json --> script object --> "start" : "parcel index.html"
    //and to use that --> npm run start

if (module.hot) {
  module.hot.accept(); //doesn't work in browser, supported by parcel, ---> if any module is change, don't reload the whole project, just inject tha updated module in importing file.
}


////////////////////////////////////////////////////////////////////////////////////////////////
///---------------> CONFIGURING BABEL AND POLYFILLING   <--------------------  
//converting modern code back to ES5 code.

//Parcel automatically uses Babel, but some of the ES6 features are not convertable to ES5, like :
console.log(cart.find(x => x.quantity>=2));
Promise.resolve('Test').then((x) => console.log(x));
//In order to convert such features to ES5, we use polyfilling
//core-js library is used for polyfilling, --> it will recreate all ES6 features.
import 'core-js/stable'; //needs to be installed --> npm install core-js
import 'core-js/stable/array/find';  //will polyfill one specific given feature.
import 'core-js/stable/promise';

//Polyfilling async functions
import 'regenerator-runtime/runtime'; //need to be installed --> npm install regenerator-runtime





////////////////////////////////////////////////////////////////////////////////////////////////
///---------------> DECLARATIVE AND FUNCTIONAL JAVASCRIPT PRINCIPLES   <--------------------
/*
//Two fundamentally different ways of writing code :
                            //Imperative                                                     //Declarative
1.       Programmer explains how to do things.                                        Programmer tells what to do.
2.      Explain computer every single step to achieve a result.              Simply describe the way computer should achieve a result. 
                                                                             (step by step instruction) get abstracted away. 

*/

//-----------> Imperative <------------------  step by step instruction 
const arr = [2,5,6,7,8,3];
const doubled = [];
for (let i = 0; i < arr.length; i++) {
  doubled[i] = arr[i] * 2;
}
//-----------> Declarative <------------------  no step by step instruction
const arr2 = [2,5,6,7,8,3];
const doubled2 = arr.map(item => item * 2);


////////////////////////////////////////////////////////////////////////////////////////////////
///---------------> FUNCTIONAL PROGRAMMING   <--------------------
/*
It is a Declarative programming paradigm.
Based on the idea of writing software by combining many pure functions, avoiding side effects and mutating data.
        Side effects : A side effect is basically simply a modification of any data that's outside of a function. For example, mutating any variable that is external to the function is causing a side effect.
        Pure functions : A pure function, is a function without side effects. basically a function that does not mutate any external variables, and that does also not depend on any external variables.
        Immutability : In functional programming state, which also means basically data is never modified.

Functional programming techniques :
Try to avoid data mutations as often as possible.
Always prefer, built in methods or functions that do not produce side effects over the ones that do,
For data transformations, use a method such as Map, Filter and Reduce.

Declarative syntax :
use array and object destructuring
use spread operator(...)
User ternary operators( ? : )
use template literals ` `
*/


