'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    //.insertAdjacentHTML(position, text) --> To insert HTML in DOM --> (position : beforebegin, afterbegin, beforeend, afterend)
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const calcDisplayBalance = function(account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance}€`;
}

const calcDisplaySummary = function(acc) {
  const depositBalance = acc.movements.filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov,0);
  labelSumIn.textContent = `${depositBalance}€`;

  const withdrawBalance = acc.movements.filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov,0);
  labelSumOut.textContent = `${Math.abs(withdrawBalance)}€`;

  const interest = acc.movements.filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate/100)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int,0);
  
  labelSumInterest.textContent = `${interest}€`;
}

/*
//create a string from first letter of name
const user = 'Steven Thomas Williams';
// const userName = user.toLowerCase().split(' ');
// console.log(userName);

// const userName = user.toLowerCase().split(' ').map(word => word[0]);
// console.log(userName);

const userName = user.toLowerCase().split(' ').map(word => word[0]).join('');
console.log(userName);
*/

const createUserNames = function(accs) {
  accs.forEach(function(acc){   //we are chaning the existing array and not returning any new array so we are using forEach
    acc.userName = acc.owner.toLowerCase().split(' ').map(word => word[0]).join('');
  })
}

createUserNames(accounts);
console.log(accounts);

const displayDetails = function(loggedInAccount) {
  //Display movements
  displayMovements(loggedInAccount.movements);

  //Display balance
  calcDisplayBalance(loggedInAccount);

  //Display summary
  calcDisplaySummary(loggedInAccount);
}



//Event Handlers
let currentAccount;
btnLogin.addEventListener('click', function(e){
  e.preventDefault(); //will prevent form from submitting
  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);
  if(currentAccount?.pin === Number(inputLoginPin.value)){
    
    console.log(currentAccount);

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); //removes the focus from current field
    // Display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`;
    containerApp.style.opacity = 100;

    //update data
    displayDetails(currentAccount);

  } else alert('Please enter correct Credential!');
})


//Transfer Money

btnTransfer.addEventListener('click', function(event){
  event.preventDefault(); //will prevent form from submitting

  const transferToUser = accounts.find(acc => acc.userName === inputTransferTo.value);
  const transferAmount = Number(inputTransferAmount.value);

  //if money is valid( more than 0 and less than balance available) and not sending to own account
  if(transferAmount > 0 && transferAmount <= currentAccount.balance && transferToUser && transferToUser?.userName !== currentAccount.userName) { 

    //deduct money from current account
    currentAccount.movements.push(-transferAmount);

    //update the reciever account
    transferToUser.movements.push(transferAmount);

    //update data of current user
    displayDetails(currentAccount);
  } else {
    if(transferAmount < 0) alert('Enter Valid Amount');
    else if(transferAmount > currentAccount.balance) alert('Insufficient Balance!');
    else if (!transferToUser) alert ('No account found!');
    else if(transferToUser.userName === currentAccount.userName) alert('Cannot send to own account');
  }

  //clear the input fields
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur(); //removes the focus from current field
  
})

//Request Loan
btnLoan.addEventListener('click', function(event){
  event.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);
  if(loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1)){
    //push amount
    currentAccount.movements.push(loanAmount);

    //update data of current user
    displayDetails(currentAccount);
    
  } else if(loanAmount <= 0) alert('Please enter a valid amount');
  else alert(`Try lesser amount.`);

  //clear the input fields
  inputLoanAmount.value = '';
  inputLoanAmount.blur(); //removes the focus from current field
})

//Close Account
btnClose.addEventListener('click', function(event){
  event.preventDefault();

  if(inputCloseUsername.value === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin){
    const accountIndex = accounts.findIndex(acc => acc.userName === inputCloseUsername.value);
    accounts.splice(accountIndex, 1) //start deleting from accountIndex and delete 1 element

    //remove data of current user being displayed
    containerApp.style.opacity = 0; 
    //change welcome message
    labelWelcome.textContent = 'Log in to get started';
    
  } else alert('Please enter correct Credential!');
  //clear the input fields
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur(); //removes the focus from current field
})

let sorted = false;
btnSort.addEventListener('click', function(event){
  event.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})













//Array Methods --> Advance






/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*


let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE --> returns new array and does not mutate original array, 

console.log(arr.slice(2)); //from index 2 to last
console.log(arr.slice(2,4)); //from index 2 to index 3 (4-1) --> c, d --> end 
console.log(arr.slice(-2)); // 2 elements from last
console.log(arr.slice(-1)); // last element
console.log(arr.slice(1, -1));// from index 1 to last except elements in end argument --> index 1 to except last 1 item
console.log(arr.slice()); // just a shallow copy of array
console.log([...arr]); //just a shallow copy of array



//SPLICE --> used for deleting elements, 1st arg. for starting index and 2nd argument is number of items to delete.

// console.log(arr.splice(2)); // will remove all the items from origianl array staring from index 2
// console.log(arr); // will return a, b only

arr.splice(-1); //will remove the last element
console.log(arr);
arr.splice(1, 2); // will delete 2 elements starting from index 1. --> 2nd argument is number of items to delete  


//REVERSE --> reverses the orginal array  --> mutates the orginal array

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);



//CONCAT --> concatenate two arrays --> does not mutates the original array.

const letters = arr.concat(arr2);
console.log(letters);

console.log([...arr, ...arr2]); // same as above



//JOIN --> join all elements of array with a separator

console.log(letters.join(' - '));




//AT --> finding value at a particulaer index, like traditional method arr[index]
//AT method also works for strings
const arr3 = [23, 11, 64];
console.log(arr3[0]); //tradional way
console.log(arr3.at(0));  //through array method

//getting last element of array
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1)); //last element
console.log(arr3.at(-2)); //second last element




//FOREACH --> looping through arrays

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log('----- OF ------');
//of method
// for(const movement of movements) {
for(const [index, value] of movements.entries()) {
  if(value > 0) {
    console.log(`Movement ${index + 1}: You deposited ${value}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(value)}`);
  }
}

console.log('----- FOREACH ------');
//foreach method --> requires a callback function --> function that passed as an argument --> forEach method will call that function
//forEach loopes through all the elements in array in call the function for every elements --> so we need to pass the element in function
movements.forEach(function(movement) {
  if(movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
})

//forEach passes 3 parameters in callback function --> current element, index, whole array
//A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
movements.forEach(function(movement, index, arr) {
  if(movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
})
//continue and break does not work in forEach loop




//FOREACH in Maps 

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
})

//FOREACH in Sets
const currenciesUnique = new Set(['INR', 'USD', 'INR', 'GPB', 'EUR', 'USD']);

//here, key argument for sets return the values, so it is unnecessary. 
currenciesUnique.forEach(function(value, key, iterable){
  console.log(`${key}: ${value}`);
})
*/



/*
//MAP, FILTER & REDUCE

//MAP --> like forEach but creates a new array --> Map each values, do operation and creates new array 
//Filter --> returns a new array containing the elements that passes the specified condition
//Reduce --> reduces an array to a single value --> ex. -> adding all elements of array and find sum.


//Map -->Calls a defined callback function on each element of an array, and returns an array that contains the results.
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUSD = movements.map(function(mov){
  return mov * eurToUsd;
})
const movementsUSDArrow = movements.map(mov => mov * eurToUsd); //same as above
console.log(movementsUSD);
console.log(movementsUSDArrow);

//Like forEach map also accepts three arguments
const movementsDescription = movements.map((mov, i, arr) => `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${mov}`); //automatically pushing to array
console.log(movementsDescription);



//Filter 
const deposits = movements.filter(function(mov){
  return mov > 0; //automatically pushing to array
});
console.log(deposits);

const depositsArrowFn = movements.filter(mov => mov > 0); //will return an array of only positive values
console.log(depositsArrowFn);

const depositsForOfLoop = []
for(const mov of movements) if(mov > 0) depositsForOfLoop.push(mov);
console.log(depositsForOfLoop);


const withdrawls = movements.filter(mov => mov < 0); //will return an array of only positive values
console.log(withdrawls);




//Reduce --> first argument of function is Accumulator which holds the total value of all previous values;
//second argument after function is initial value of accumulator
const balance = movements.reduce(function(accumltr, current, index, array){
  console.log(`Iteration ${index}: ${accumltr}`);
  return accumltr + current; //return the sum and use in next iteration --> finally return the final value of accumulator in last iteration
}, 0); // initial value of accumulator

console.log(balance);


const balance1 = movements.reduce((accumltr, current) => accumltr + current, 0);
console.log(balance1);


//with for of loop
let balance2 = 0;
for(const mov of movements) balance2+=mov;
console.log(balance2);



//Maximum value using Reduce
const maximum = movements.reduce(function(acc, cur){
  if(acc > cur) return acc;
  else return cur;
} ,movements[0]);
console.log(maximum);

//array
const maximum1 = movements.reduce((acc, cur) => acc = acc < cur ? cur : acc ,movements[0]);
console.log(maximum1);

*/

/*

//chaining multiple methods
const eurToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const totalDepositsToUSD = movements.filter(mov => mov > 0)
        .map(mov => mov * eurToUsd)
        .reduce((acc, mov) => acc + mov,0);

console.log(totalDepositsToUSD);

*/

/*
//FIND method --> will return the first element that satisfies the condition.
//Returns the value of the first element in the array where predicate is true, and undefined otherwise.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawl = movements.find(mov => mov < 0);
console.log(firstWithdrawl);


console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

*/

/*

//FINDINDEX method --> Returns the index of the first element in the array where predicate is true, and -1 otherwise.
const index = accounts.findIndex(acc => acc.userName === 'stw');
console.log(index);

*/


/*

//SOME and EVERY method
//Some --> Checks whether atleast one element satisfies the given condition
//Every --> Check whether all elements satisfies the given condition

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.includes(450)); //checks equality

//checks based on the condition
const anyDeposit = movements.some(mov => mov > 200); //will return true if any element is greater than 200
console.log(anyDeposit);

const allDeposit = movements.every(mov => mov > 0); //return true only if all element is array is more than 0
console.log(allDeposit);

*/

/*

//FLAT and FLATMAP 

//Flat --> For nested array, it brings all the elements in array along with arrays inside the array (Only one level deep) into a new normal array.
const arr = [[1,2,3], [4,5,6], 7, 8];
console.log(arr.flat()); //[1,2,3,4,5,6,7,8]


const arrDeep = [[[1,2],3], [4,[5,6]], 7, 8];
console.log(arrDeep.flat()); //[Array(2), 3, 4, Array(2), 7, 8] --> flat works for only one level deep
//To go to next level of nesting, we need to pass the argument as levels to nest in flat method.

console.log(arrDeep.flat(2)); //[1, 2, 3, 4, 5, 6, 7, 8] --> Two level nesting


const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overallBalance = allMovements.reduce((acc, mov) => acc + mov,0);
console.log(overallBalance);

//OR
const overallBalance2 = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov,0);
console.log(overallBalance2);


//FlatMap --> DOing the task of map and flat together   --> goes only one level deep
const overallBalance3 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov,0);
console.log(overallBalance3);

*/


/*

//Sorting Arrays

//Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); //Mutates the original array.


//Numbers --> Sort method does sorting based on string and hence not bale to sort number array given below
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements); //[200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements.sort()); //[-130, -400, -650, 1300, 200, 3000, 450, 70]

//solution --> we need to pass comparison as argument, (current and next)
//Ascending
movements.sort((a, b) => {
  //if return < 0 and place A before B (keep the order)
  //if return > 0 and place B before A (switch the order)
  if(a > b)
    return 1;
  if(a < b)
    return -1;
})
console.log(movements);

//Descending
movements.sort((a, b) => {
  if(a > b)
    return -1;
  if(a < b)
    return 1;
})
console.log(movements);


//Or
movements.sort((a, b) => a-b); //Ascending
console.log(movements);
movements.sort((a, b) => b-a); //Descending
console.log(movements);


*/


/*

//Programitacally create and fill Array
console.log([1,2,3,4,5,6,7]);
console.log(new Array(1,2,3,4,5,6,7));//in these cases we already have our data

const x = new Array(7);  //Whenever we pass one argument, then it creates a new empty array of that length
console.log(x); //[empty × 7]
const x2 = new Array((7));
console.log(x2); //[empty × 7]

//filling empty array
// x.fill(1); //will fill 1 at all places of empty array 
// console.log(x);//[1, 1, 1, 1, 1, 1, 1]

// x.fill(1, 2); //takes three argument like slice, first is value second is index from where to start filling and third is end index
// console.log(x);  //[empty × 2, 1, 1, 1, 1, 1]

x.fill(1, 2, 5);
console.log(x); //[empty × 2, 1, 1, 1, empty × 2]  from index 2 to index 4


// fill also mutates the existing normal array
const arr = [1,2,3,4,5,6,7];

arr.fill(23, 4, 6);
console.log(arr); //[1, 2, 3, 4, 23, 23, 7]


//Array.from --> takes length and create array elements by iterating the object
const y = Array.from({length: 7}, () => 1);
console.log(y);

const z = Array.from({length: 7}, (_, index) => index + 1); // _ means we do not need that variable, throwable variable
console.log(z);

const diceRolls = Array.from({length: 100}, () => Math.trunc(Math.random() * 6 + 1));
console.log(diceRolls);

//Use case of Array.from
//Creating array from nodeList given by querySelectorAll

labelBalance.addEventListener('click', function(){
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => el.textContent.replace('€', ''));
  console.log(movementsUI);
})

*/
