'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-12-28T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-12-26T23:36:17.929Z',
    '2022-12-29T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function(date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1)/(1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  if(daysPassed === 0) return 'Today';
  else if(daysPassed === 1) return 'Yesterday';
  else if(daysPassed <= 7) return `${daysPassed} days ago.`;
  else {
    //creating date manually
    /*
    const day = `${date.getDate()}`.padStart(2, 0); //Making two digit, if not two digit add zero at start
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
    */
    //creating date with internationalization method
    return new Intl.DateTimeFormat(locale).format(date);
  }
}

const formatCur = function(locale, currency, amount) {
  return new Intl.NumberFormat(locale, {style: 'currency', currency: currency}).format(Math.abs(amount));
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(acc.locale, acc.currency, mov);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = formatCur(acc.locale, acc.currency, acc.balance);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(acc.locale, acc.currency, incomes);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(acc.locale, acc.currency, out);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(acc.locale, acc.currency, interest);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

/*
//Experimenting API --> Internationalization of Dates
const now = new Date();

//In options we provide what all data we want in our date
const options = {
  hour : 'numeric',
  minute : 'numeric',
  day : 'numeric',
  month : 'long', //long for full name in English, numeric for numeric value, 2-digit for 2 digit value, short for small names, narrow for first letter
  year : 'numeric',
  weekday: 'long'
}

//get locale from users' browser
const locale = navigator.language;

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
*/

const startLogoutTimer = function(){
  //Set time to 5 minutes
  let time = 300;

  //function to show timer and logout
  const tick = function(){
    const min = `${Math.trunc(time/60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);
    //in each call print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;
    //when 0 seconds, stop timer and log out user
    if(time === 0){
      //turn off timer
      clearInterval(timer);
      //logout
      containerApp.style.opacity = 0;
       // Display UI and message
      labelWelcome.textContent = 'Login to get started';
    }
    //Decrease 1 second
    time--;
  }
  //call first time because setInterval will start after 1 second
  tick();
  //call timer every second
  timer = setInterval(tick, 1000);

  //return timer so that we can stop previous running timers
  return timer;

};


btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    /* manullay creaating date
    //Dispaly current Date
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0); //Making two digit, if not two digit add zero at start
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hours = `${now.getHours()}`.padStart(2, 0);
    const minutes = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = (`${day}/${month}/${year}, ${hours}:${minutes}`);
    */
   //creating date with internationalization method
    const now = new Date();
    const options = {
      hour : 'numeric',
      minute : 'numeric',
      day : 'numeric',
      month : 'numeric',
      year : 'numeric',
      // weekday: 'long'
    };
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //timer check if already running then stop
    if(timer) clearInterval(timer);
    //start timer and save to timer
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //Reset Timer
    clearInterval(timer);
    //start timer and save to timer
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

    setTimeout(function(){ 
      // Add movement
      currentAccount.movements.push(amount);
      //Add loan Date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
  //Reset Timer
  clearInterval(timer);
  //start timer and save to timer
  timer = startLogoutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
  //Reset Timer
  clearInterval(timer);
  //start timer and save to timer
  timer = startLogoutTimer();
});

/////////////////////////////////////////////////












/////////////////////////////////////////////////
// LECTURES

/*

//CONVERTING NUMBERS AND CHECKING NUMBERS

//By default, all numbers are floating numbers in JS.
console.log(23 === 23.0); //true

//Numbers are always stored in binary format
// Decimal --> Base 10 --> 1 to 9
// Binary --> Base 2 --> 0 and 1

console.log(0.1 + 0.2); //0.30000000000000004 --> JS behaves like this with 0.1 
console.log(0.1 + 0.2 === 0.3); //false --> Error in JS


//Converting to number

console.log(Number('23'));
console.log(+'23'); //Adding + will convert to Number  --> Type Coersion

//Parsing  --> parseInt
console.log(Number.parseInt('30px')); //30 --> JS will find out the number in string if it starts with a number
console.log(Number.parseInt('e34')); //NaN --> Not starting with a number

//parseInt also accepts 2nd argument as redix,(base number)
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e34', 10));

//parseFloat
console.log(Number.parseFloat('2.5rem')); //2.5
console.log(Number.parseInt('2.5rem')); //2

//isNaN  --> Checking if resulting value is NaN
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN('20')); //false
console.log(Number.isNaN(+'20s')); //true
console.log(Number.isNaN(23/0)); //false


//isFinite --> Checking if a value is a number
console.log(Number.isFinite(23 / 0)); //false
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false (not a number)


//isInteger
console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23.4)); //false
console.log(Number.isInteger(23 / 0)); //false

*/


/*

//MATH and ROUNDING

//Square root
console.log(Math.sqrt(16)); //OR
console.log(16 ** (1/2));

//cubic root
console.log(8 ** (1/3));

//Maximum value
console.log(Math.max(5,33,45,2,21,3,34,4,21,342,45,221,231,342,45,213));
console.log(Math.max(5,33,45,2,21,3,34,4,21,'342',45,221,231,342,45,213)); //does type coersion
console.log(Math.max(5,33,45,2,21,3,34,4,21,'342px',45,221,231,342,45,213)); //no parseInt so NaN will be returned

console.log(Math.min(5,33,45,2,21,3,34,4,21,342,45,221,231,342,45,213));

//Math constants
console.log(Math.PI); //3.141592653589793
console.log(Math.trunc(Math.random() * 6) + 1);

//function to generate number between given minimum and maximum value
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 25));


//Rounding Integers
//trunc --> simply removes the decimal part
console.log(Math.trunc(23.34312)); //23

//round
console.log(Math.round(23.34312)); //23
console.log(Math.round(23.74312)); //24

//ceil
console.log(Math.ceil(23.34312)); //24
console.log(Math.ceil(23.74312)); //24

//floor
console.log(Math.floor(23.34312)); //23
console.log(Math.floor(23.74312)); //23

//floor vs trunc are same in case of positive number

//floor vs trunc in case of negative
console.log(Math.trunc(-23.34312)); //-23 //simply removing
console.log(Math.floor(-23.74312)); //-24 //flooring



//Rounding Decimals
//toFixed --> always returns a string , takes number of digits to display after decimal as argument
console.log((2.3234).toFixed(0)); //need zero digits afer decimal ---> o/p = 2 
console.log((2.7234).toFixed(0)); //need zero digits afer decimal ---> o/p = 3

console.log((2.7234).toFixed(2)); //'2.72' (string)
console.log(+(2.7234).toFixed(2)); //2.72 (Number)

*/

/*

//REMAINDER Operator  --> Returns remainder of a division
console.log(5 % 2); //1

const isEven = n => n % 2 === 0;
console.log(isEven(3));
console.log(isEven(236));
console.log(isEven(219));

labelBalance.addEventListener('click', function(){
  [...document.querySelectorAll('.movements__row')].forEach(function(row , i){
    if(i % 2 === 0) row.style.backgroundColor = 'orangered';
    if(i % 3 === 0) row.style.backgroundColor = 'blue';
  });
})

*/


/*

//NUMERIC SEPARATOR
const diameter = 260_354_000_000; //Js ignores underscores  --> We cannot place underscore at begining/end of a number , and beside decimal between number like 3_.12 or 3._12
console.log(diameter); //260354000000


//BIGINT
//Maximum value of integer that can be saved in JS
console.log(2 ** 53 - 1); //2 ** because JS supports binary stoarge of Integrgers..... and  JS supports 64 bit binary storage of Integers, out of which only 53 is used for storage, rest are for decimal and etc.. (-1 is because index starts from 0)
console.log(Number.MAX_SAFE_INTEGER);

console.log(87326873677128734276387467861278364321676473123); //8.732687367712873e+46
console.log(87326873677128734276387467861278364321676473123n); //87326873677128734276387467861278364321676473123n --> n transforms the number into BigInt
//Operations with BigInt
console.log(10000n + 10000n); //2000n
console.log(7634871638276521873n * 32765476n); //250160203427030058793256548n
// console.log(6546543534n * 12); //we cannot mix BigInt with regular number --> Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
console.log(6546543534n * BigInt(12)); //This will work after converting normal number to BigInt 
// console.log(Math.sqrt(16n)); // Math operator doesnt work --> error
//Exceptions
//we can mix regular number and BigInt for comparison
console.log(20n > 15); //true
console.log(20n === 20); //false --> Type is not matching
console.log(20n == 20); //true --> Type not checked here --> Type coersion done
console.log(20n == '20'); //true --> Type not checked here --> Type coersion done

console.log(67325467284573298754237561n + ' is really big !!'); //Type coersion supported --> 67325467284573298754237561 is really big !!

//Division
console.log(13n / 3n); //4n --> removes the decimal part

*/


//DATES
/*
//Create a Date 
const now = new Date();
console.log(now); //Wed Dec 28 2022 00:36:13 GMT+0530 (India Standard Time)
console.log(new Date('Dec 28 2022 00:37:13')); //Wed Dec 28 2022 00:37:13 GMT+0530 (India Standard Time)
console.log(new Date('April 22, 2018')); //Sun Apr 22 2018 00:00:00 GMT+0530 (India Standard Time)

console.log(new Date(account1.movementsDates[0])); //Tue Nov 19 2019 03:01:17 GMT+0530 (India Standard Time)
console.log(new Date(2019, 2, 13, 23, 18, 15)); //Wed Mar 13 2019 23:18:15 GMT+0530 (India Standard Time) --> Month is zero based 
console.log(new Date(2019, 1, 13, 23, 18, 15)); //Wed Feb 13 2019 23:18:15 GMT+0530 (India Standard Time) --> month should be one less

console.log(new Date(0)); // zero milisecond after Jan 01, 1970
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //3 days after Jan 01, 1970  --> 3 days = 3 days, 24 hours, 60 minutes, 60 seconds, 1000 miliseconds



//Working with dates
const future = new Date(2023, 2, 30, 13, 10); //without seconds -->Thu Mar 30 2023 13:10:00 GMT+0530 (India Standard Time)
console.log(future);
console.log(future.getFullYear());//2023
console.log(future.getMonth());//2 --> zero based
console.log(future.getDate());//30
console.log(future.getDay());//4 --> Day of the week
console.log(future.getHours());//13
console.log(future.getMinutes());//10
console.log(future.getSeconds());//0


console.log(future.toISOString());//2023-03-30T07:40:00.000Z
//timestamp
console.log(future.getTime()); //1680162000000
console.log(new Date(1680162000000)); //Thu Mar 30 2023 13:10:00 GMT+0530 (India Standard Time) --> Same date as above
console.log(Date.now()); //1672169425687 --> Current TimeStamp

//setting the dates
future.setFullYear(2023); //also exists setMonth, setDate, setDay .... 
console.log();


const now = new Date();
// labelDate.textContent = now; //Wed Dec 28 2022 01:07:26 GMT+0530 (India Standard Time)

//28/12/2022 --> day/month/year
const day = `${now.getDate()}`.padStart(2, 0); //Making two digit, if not two digit add zero at start
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hours = `${now.getHours()}`.padStart(2, 0);
const minutes = `${now.getMinutes()}`.padStart(2, 0);
console.log(`${day}/${month}/${year}, ${hours}:${minutes}`);

*/
/*

//Operations with Dates

//Subtracting Dates and finding no. of days with help of timestamp
const future = new Date(2023, 2, 30, 13, 10);
console.log(Number(future)); //will convert into timestamp --> 1680162000000 (in miliseconds)
console.log(+future); //will convert into timestamp --> 1680162000000 (in miliseconds)

const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1)/(1000 * 60 * 60 * 24);  //converting to days

const days1 = calcDaysPassed(new Date(2022, 6, 15), new Date(2023, 2, 30));
console.log(days1);

*/
/*

//Number formatting
const num = 24213543.32;

const option ={
  style: 'currency', //percent, currency, unit
  unit: 'mile-per-hour', //celcius
  currency: 'INR', 
  // useGrouping: false, //will remove the separtors
}

console.log(new Intl.NumberFormat('en-IN').format(num)); //2,42,13,543.32
console.log(new Intl.NumberFormat('de-DE').format(num)); //24.213.543,32
console.log(new Intl.NumberFormat('en-US').format(num)); //24,213,543.32
console.log(new Intl.NumberFormat('ar-SY').format(num)); //٢٤٬٢١٣٬٥٤٣٫٣٢
console.log(new Intl.NumberFormat(navigator.language).format(num)); //24,213,543.32

//with option
console.log(new Intl.NumberFormat('en-IN', option).format(num)); // ₹2,42,13,543.32
console.log(new Intl.NumberFormat('de-DE', option).format(num)); // 24.213.543,32 ₹
console.log(new Intl.NumberFormat('en-US', option).format(num)); // ₹24,213,543.32
console.log(new Intl.NumberFormat('ar-SY', option).format(num)); // ٢٤٬٢١٣٬٥٤٣٫٣٢ ₹
console.log(new Intl.NumberFormat(navigator.language, option).format(num)); // ₹24,213,543.32

*/


/*

//SETTIMEOUT and SETINTERVAL

//setTimeout

//takes callback function as argument, and time in miliseconds in second argument 
//code execution continues after registering the setTimeout function --> this mechanism is called Asynchronous JavaScript.
setTimeout(() => console.log('Here is your pizza 🍕'), 2000);
console.log('Waiting...')// first waiting will be executed then Here is your pizza will be executed.

//passing arguments in settimeout, since we are not calling setTimeout() manually, the arguments which we pass after the delay, will be the arguments
const ingredients = ['olive', 'spinach']
const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your ${ing1} and ${ing2} pizza 🍕`), 3000, ...ingredients);
//termination the setTimeout without completing.
if(ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//setInterval  --> schedules a function to run again and again after a certain amount of time
setInterval(function(){
  const time = new Date();
  const option = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month:'short',
    year: 'numeric'}
  const now = new Intl.DateTimeFormat('en-IN', option).format(time);
  console.log(now);
}, 1000);

*/