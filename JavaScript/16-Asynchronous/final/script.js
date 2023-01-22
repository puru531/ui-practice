'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

////////////////////////////////////////////////////////////////////////////////
//Functions
const renderCountryCard = function (data, className = '') {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} M people</p>
      <p class="country__row"><span>🗣️</span>${languages}</p>
      <p class="country__row"><span>💰</span>${currencies[0].name}</p>
      <p class="country__row"><span>🌎</span>${data.area.toLocaleString()} km²</p>
    </div>
    </article>
        `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1; //handling in finally block, if needed for other functions where finally is not implemented, uncomment it
};
//making function for repeated codes
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    //creating manual error on status code is not 200 or 'ok' is false
    if (!response.ok) throw new Error(`${errorMsg}: (${response.status})`); //will be catched by catch method
    return response.json();
  });
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1; //handling in finally block, if needed for other functions where finally is not implemented, uncomment it
};

///////////////////////////////////////
//Synchronous : Code is executed line by line, each line waits for previous line to finish.
//This can be a problem when one line of code takes longer time. It will block the code execution.
//Asynchronous : Asynchronous code is non-blocking, Asynchronous code is executed afrer a task that is running in the background, finishes.
//Execution does not wait for an asynchronous task to finish its work.

//AJAX : Asynchronous JavaScript And XML allows us to communicate with remote servers in an asynchronous manner.
//With Ajax calls, we can request data from the web servers dynamically

//API : Application Programming Interface : Piece of software that can be used by another piece of software, in order to to allow applications to interact with each other.
//There can be many different types of APIs : DOM API, Geolocation API, Own class API, Online API, etc.

//Online API : Application running on a server, that recieves requests for data, and sends data back as response.

//JSON : Data format that is used in APIs (no more XML)

////////////////////////////////////////////////////////////////////////////////////////////////
//First AJAX call : XMLHttpRequest
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest(); //old way of doing ajax call
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText)[1];
    console.log(data);

    const html = `
    <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('india');
getCountryData('america');
getCountryData('united');
getCountryData('china');
*/

////////////////////////////////////////////////////////////////////////////////
//Callback Hell
/*

const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () { //parent callback
    const data = JSON.parse(this.responseText)[0];
    //render country 1
    renderCountryCard(data);

    //get neighbor countries
    let neighbours = data.borders;
    if (!neighbours) return;
    console.log(neighbours);
    neighbours = neighbours.slice(0, 4);
    console.log(neighbours);
    neighbours.forEach(function (neighbor) {
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha?codes=${neighbor}`); //one AJAX call depending on another one.
      request2.send();
      request2.addEventListener('load', function () { //callback function in a callback function (child callback)
        const [data2] = JSON.parse(this.responseText);
        renderCountryCard(data2, 'neighbour');
      });
    });
  });
};
//when we have a callback under a callback and again callback under a callback and so on... is known as callback hell. 

getCountryAndNeighbour('india');

*/

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////  PROMISES AND FETCH API  --> we can escape callback hell

////////////AJAX call
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/india`);
// request.send();
// request.addEventListener('load', function () { //parent callback
//   const data = JSON.parse(this.responseText)[0];
//   console.log(data);
// });

////////////fetch call
// const request = fetch('https://restcountries.com/v3.1/name/india');
// console.log(request);

//  PROMISE : An object that is used as a placeholder for the future result of an asynchronous operation. --> container for a response coming from AJAX call
//we don't need to rely on events and callback functions.
//Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations. (Escaping callback hell)

/// Promise Lifecycle
//Pending : Before the future value is available. When promise is unresolved. (Asynchronous task is in progress)
//Setteled : Asynchronous task has finished. Two types of settled promises:
//Fulfilled promise : Successfully resulted the expected value.
// Rejected promise : If any error is encountered

//Consuming promises : -->
/*
const getCountryData = function (country) {
  //fetch will return the promise. and if promise is fulfilled we handle it using .then() method with a callback function
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) { //will give the Response object, in which 'body' will hold the data, we need to use JSON to see that data
      console.log(response);
      return response.json(); //json method is available for all respons values
      //json method is also an asynchronous function, which will also return a promise and we need to handle that too. for that we are returning response.json promise
    })
    .then(function (data) {  // handling promise of response.json
     console.log(data);
      renderCountryCard(data[0]);
    });
};
*/ //same code below (clean and short)
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountryCard(data[0]));
};

getCountryData('india');
*/
////////////////////////////////////////////////////////////////////////////////////////////////
//////// CHAINING PROMISES
/*
const getCountryAndNeighbour = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountryCard(data[0]);
      const neighbours = data[0].borders?.[0];
      if (!neighbours) return;
      return fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbours}`); // fulfilled value will be passed as promise to next .then
      //Adding .then here only will work but will make the callback hell
    })
    .then(response => response.json())
    .then(data => renderCountryCard(data[0], 'neighbour'));
};

getCountryAndNeighbour('india');

*/

////////////////////////////////////////////////////////////////////////////////////////////////
//////// HANDLING REJECTED PROMISES  --> error case is passed as second argument in .then method (annoying because we need to handle evertime we do fetch)
// We can use .catch() method to catch all errors in one go
//fetch promise only rejects in case of no internet
/*
const getCountryAndNeighbour2 = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      response => response.json()
      //   ,err => alert(err) //catching error
    )
    .then(data => {
      renderCountryCard(data[0]);
      const neighbours = data[0].borders?.[0];
      if (!neighbours) return;
      return fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbours}`);
    })
    .then(
      response => response.json()
      //   ,err => alert(err) //catching error
    )
    .then(data => renderCountryCard(data[0], 'neighbour'))
    .catch(err => {  //will catch any error occurred in whole promise chain
        console.error(`${err} 💥💥💥💥`);
        renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);

    }) //no matter the promise is fulfilled or rejected, finally block is always executed.
    .finally(() => { //use this for something that always needs to happen
        countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryAndNeighbour2('india');
});
*/
////////////////////////////////////////////////////////////////////////////////////////////////
//////// THROWING ERRORS MANUALLY
//fetch promise only rejects in case of no internet, It fullfills the promise in case of 404 (no data found).

/*

const getCountryAndNeighbour3 = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
        //creating manual error on status code is not 200 or 'ok' is false
        if(!response.ok)
            throw new Error(`Country not found : (${response.status})`); //will be catched by catch method
        return response.json();
    })
    getJSON(`https://restcountries.com/v3.1/name/${country}`)
    .then(data => {
      renderCountryCard(data[0]);
      const neighbours = data[0].borders?.[0];
      if (!neighbours) return;
      return fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbours}`);
    })
    .then(response => {
        if(!response.ok)
            throw new Error(`Country not found : (${response.status})`); //will be catched by catch method
        return response.json();
    })
    .then(data => renderCountryCard(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryAndNeighbour3('india');
});

*/
/*
//making function for repeated codes
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    //creating manual error on status code is not 200 or 'ok' is false
    if (!response.ok) throw new Error(`${errorMsg}: (${response.status})`); //will be catched by catch method
    return response.json();
  });
};

const getCountryAndNeighbour4 = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found') //////
    .then(data => {
      renderCountryCard(data[0]);
      const neighbours = data[0].borders?.[0];
      if (!neighbours) throw new Error('No neighbour found');
      return getJSON(`https://restcountries.com/v3.1/alpha?codes=${neighbours}`, 'Country not found'); /////
    })
    .then(data => renderCountryCard(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryAndNeighbour4('india');
});
*/

////////////////////////////////////////////////////////////////////////////////////////////////
//////////   EVENT LOOP
// when a pice of code has normal code and asynchronous code, the normal code goes directly in call stack and executes the task
// but asynchronous code goes to call stack and call back function of it is put into Web api where it is executed in background.
// after the background task is finishes, the callback function is passd into Callback queue if it is not promise returning, and in microtask queue if it is not promise returning.
//microtask queue has more priority that callback queue. And event loop passes the callback function to call stack from microtask queue or callback queue.
/*
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end');
*/
//output :
/*
Test start  --> synchronous task executed immediately
Test end --> asynchronous task put into web api and executed the synchronous task first.
Resolved promise 1  --> after background task finished, microtask queue was given priority and event loop passed it first to call stack
0 sec timer  --> after microtask, callback queue function was sent into call stack. timer is not a guarantee that it will be executed immediately after given timer in timeout, but it also depends on promise and its mircotask to complete.
                    // if mircotask takes more time, the timeout will be delayed.
*/

////////////////////////////////////////////////////////////////////////////////////////////////
//////////   BUILDING A SIMPLE PROMISE
/*
//creating promise
//constructor object takes one argument, i.e. executor function
const lotteryPromise = new Promise(function (resolve, reject) {// as soon as promise constructor runs, it will automatically execute the executor function by passing two arguments to function (resolve, reject)
    //this function will contain asynchronous behaviour which will provide the promise

    console.log('Lottery draw is happening 🔮');
    setTimeout(function () {
        if(Math.random() >= 0.5) {
            resolve('You WIN 💰') //promise fulfilled (esolved) -->resolved result in argument, which can be consumed by .then() method
        } else { 
            reject(new Error('You lost your money 💩')); //promise fulfilled (rejected) --> rejection result in argument, which can be consumed by .catch() method
        }
    }, 2000);
});

//consuming promise
lotteryPromise.then(result => console.log(result)).catch(err => console.error(err));

//Promisifying setTimeout
const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    })
}

//Consuming promise
wait(2).then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
}).then(() => console.log('I waited for 1 seconds'));

*/
////////////////////////////////////////////////////////////////////////////////////////////////
//////////   PROMISIFING GEOLOCATION API
/*
navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.error(err)
); //this is asynchronous task
console.log(
  'will execute before geolocation because geolocation is asynchronous'
);

// since it takes callback function in argument, we can promisify it
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err));   //executor function
    navigator.geolocation.getCurrentPosition(resolve, reject);  //same as above
  });
};

getPosition().then(res =>  console.log(res)).catch(err => console.error(err));

*/
////////////////////////////////////////////////////////////////
//challange
/*
const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImg = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found!'));
    });
  });
};

let currentImage;

createImg('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImg('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => console.error(err));

*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////     BETTER WAY OF CONSUMING PROMISES
/*
//adding 'async' keyword before function makes the function asynchronous.
//as soon as await is called the next code execution is blocked until await returns the promise.
        //Blocking means blocking execution of function only, which is running asynchronously in background, main thread code execution will not be blocked.
const whereAmI = async function(country) {
    // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res)); //same below
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`); //await for the result of this promise and then store it in variables after promise is resolved.
    const data = await res.json();  //same as .then(res => res.json());
    renderCountryCard(data[1]);
}

whereAmI('india');
console.log('Will be executed before async function');
*/

////////////////////////////////////////////////////////////////////////////////////////////////
//// ERROR HANDLING WITH TRY CATCH
/*
//Try catch works not only with promises, but also with normal code

// try{
//     let y = 2;
//     const x = 3;
//     x = 5; //error here
// } catch(err) {  //catching error here
//     alert(err.message);
// }

const whereAmI = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if(!res.ok) throw new Error('Country not found');
    const data = await res.json();
    renderCountryCard(data[1]);
  } catch (err) { //if any error above, will be caught here
    console.error(err);
    renderError(`Something went wrong 🙁 ${err.message}`);

  }
};

whereAmI('india');

*/
////////////////////////////////////////////////////////////////////////////////////////////////
//// RETURNING VALUES FROM ASYNC FUNCTIONS
/*
const whereAmI = async function (country) {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      if(!res.ok) throw new Error('Country not found');
      const data = await res.json();
      renderCountryCard(data[1]);
      return `You are in ${data[1].name.common}, ${data[1].region}`;  //returning from async function
    } catch (err) { //if any error above, will be caught here
      console.error(err);
      renderError(`Something went wrong 🙁 ${err.message}`);
        
      //Reject promise return from async function --> if we are returning in case of resolve then we need to rethrow error in case of reject promise. 
      throw err;
    }
  };
  
// const value =  whereAmI('india'); //storing the returned value'
// console.log(value); //will just log the promise, because an async function always returns a promise

// to get the fulfilled value of promise
whereAmI('india').then(value => console.log(value)).catch(err => console.error(err)); //in case of error in above function, it will catch there only and here it will not come in catch block
                                                                                    // so we need to rethrow the error from catch block

//using async await instead of .then used above,
//await always needs a async function to execute, so we are IIFE (Immediately Invoked Function Expression)
(async function(){
    try {
        const value = await whereAmI('india');
        console.log(value);
    } catch (err) {
        console.error(err);
    }
})();

*/
////////////////////////////////////////////////////////////////////////////////////////////////
//// RUNNING PROMISES IN PARALLEL
/*
const get3Countries = async function (c1, c2, c3) {
  try {
    //serial
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`); //fetching, error handling and converting to json.. done in this function
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    //console.log([data1.capital, data2.capital, data3.capital]);
    //Parallel  --> combinator
    //Promise.all takes array of promises and returns a new Promise   =--> if one promise is rejected, all will be rejected
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(err);
  }
};
get3Countries('america', 'portugal', 'canada');

*/

////////////////////////////////////////////////////////////////////////////////////////////////
//// Other Promise Combinators --> RACE, ALLSETTELED & ANY

/*

////////////////////Promise.race --> settles the promise if any promise settles first. --> if any promise settles then it return, doesn't wait for all.
// recieves array of promises and returns a Promise.

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/russia`),
//   ]);
//   console.log(res);  // will return only one promise value which was settled first
//   console.log(res[0]); //retrun is an array having one object
// })();

//other use case ---> timeout after certain time

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};
//using then
Promise.race([  //which ever will be fulfilled first will be passed to then
  getJSON(`https://restcountries.com/v3.1/name/india`),
  timeout(1) //will reject the promise after 1 second
]).then(data => console.log(data)).catch(err => console.error(err));
//using async await
(async function () {
    try {
        const res = await Promise.race([
          getJSON(`https://restcountries.com/v3.1/name/india`),
          timeout(1)
        ]);
        console.log(res);  // will return only one promise value which was settled first
        console.log(res[0]); //retrun is an array having one object
    }
    catch(err) {
        console.error(err);
    }
})();

*/



///////////////////// Promise.allSettled --> ES2020 --> It never short circuits like promise.all which rejects a=if any one rejects
                    //it will return the array of all promises and does not short circuit if any one promise is rejected.
/*
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another Success')
]).then(res => console.log(res)); // will rerurn {status: 'fulfilled', value: 'Success'} --> value will be promise return value.

*/

//////////////// Promise.any[ES2021]  -->  will return afirst resolved promise, and ignore the rejected
//similar to promise.race but difference is rejected is ignored in this one.
/*
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another Success')
]).then(res => console.log(res)).catch(err => console.log(err));  // o/p - Success

*/

////////////////////////////////////////////////////////////////
//challange 2

const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImg = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () { //error if image is not loaded
      reject(new Error('Image not found!'));
    });
  });
};

// let currentImage;
// createImg('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImg('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch(err => console.error(err));


//writing same above in async await mode

const loadNwait = async function(){
    try {
    let img = await createImg('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';
    img = await createImg('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
    } catch(err) {
        console.error(err);
    }
}
// loadNwait();



const loadAll = async function(imgArr) {
    try {
        const images = imgArr.map(async img => await createImg(img));
        console.log(images); //returns array of promises


        const imgsEl = await Promise.all(images); //promise handled here, will give array of images
        console.log(imgsEl);

        imgsEl.forEach(img => img.classList.add('parallel'));
    } catch(err) {
        console.error(err);
    }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg','img/img-3.jpg']);