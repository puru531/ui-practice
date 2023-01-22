'use strict';

///////////////////////////////////////////////////////////////////////////////////
//Element selection
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
///////////////////////////////////////////////////////////////////////////////////
// Modal window
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////////////////////////
//Learn More button --> smooth scroll to features section (section--1)
btnScrollTo.addEventListener('click', function(e){
  // modern way of scrolling  --> works in modern browsers only
  section1.scrollIntoView({behavior: 'smooth'});
})

///////////////////////////////////////////////////////////////////////////////////
//Page Navigation --> Without event delegation
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   }) //in this approach we are attaching same function to each element in foreach, which is not efficient, we can use event delegation to attach function to only parent
// });

//Page Navigation --> With event delegation

//Add event listener to common parent of all nav links
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  //determine waht element originated the event
  //check matching condition
  if(e.target.classList.contains('nav__link') && !e.target.classList.contains('nav__link--btn')){
    const id = e.target.getAttribute('href');
    //apply smooth scrolling
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});


///////////////////////////////////////////////////////////////////////////////////
//Building Tabbed component
tabsContainer.addEventListener('click', function(e){
  e.preventDefault();
  //finding closest element in parent scope starting from element itself
  const clickedTab = e.target.closest('.operations__tab');
  //ignore clicks done outside tab (i.e. tab container)
  if(!clickedTab) return;
  //clear active class from all tabs
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  //add active class to clicked tab
  clickedTab.classList.add('operations__tab--active');

  //remove active from all content
  tabsContent.forEach(cont => cont.classList.remove('operations__content--active'));
  //activate content area
  const content = document.querySelector(`.operations__content--${clickedTab.dataset.tab}`).classList.add('operations__content--active');
})

///////////////////////////////////////////////////////////////////////////////////
//Menu Fade Animation

const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')) {
    const hovered = e.target;
    //select sibling
    const siblings = hovered.closest('.nav').querySelectorAll('.nav__link');
    const logo = hovered.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== hovered) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}
/*

//one way of calling function
nav.addEventListener('mouseover', function(e){
  handleHover(e, 0.5)
});
nav.addEventListener('mouseout', function(e){
  handleHover(e, 1)
});

*/

//passing arguments to event handlers --> passing values of e and opacity to handleHiver function above
nav.addEventListener('mouseover', handleHover.bind(0.5));
  //mouseenter does not bubble and mouseover bubble

nav.addEventListener('mouseout', handleHover.bind(1));




///////////////////////////////////////////////////////////////////////////////////
//Sticky Navigation
/*
const initailCoordinates = section1.getBoundingClientRect()
//Bad for performance
window.addEventListener('scroll', function(){
  //whenever the scroll from top is more than the position of section1, the add sticky class so that nav becomes fixed
  if(window.scrollY > initailCoordinates.top) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
});

*/

// Better way ----> The Intersecion Observer API
//This api allows our code to observe changes to the way that a certain target element intersects another element 
//or the way it intersects the viewport
const stickyNav = function(entries){
  //no need to loop through as threshold is only one
  const [entry] = entries;   //same equal ro entry = entries[0] --> taking first element
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
};
const navHeight = nav.getBoundingClientRect().height;
const headerObserver= new IntersectionObserver(stickyNav, {root: null,
  threshold: 0, rootMargin: `-${navHeight}px`,}); //function will be excuted 90px beforee the threhold reach, 
//root --> target ko h hm pura viewport mtlb pura screen me observe karna chaah rhe hain
//threshold -->  0 means agar wo viewport me nhi ho, 0.1 means agar wo 10% dikh rha ho --> tb callback function execute ho jata hai
//rootmargin --> threshhold ko navHeight jitna hai utna px pahle hi callback ko execute kar dega.

headerObserver.observe(header);
  //jis block ko hm observe karna chaah rhe hain, wo observe function me pass kar rhe hain




///////////////////////////////////////////////////////////////////////////////////
//REVEAL SECTION --> Revealing elements on scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries; //only one threshold so take one entry
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden'); //remove hidden class for section which intersected
  observer.unobserve(entry.target); //unobserve the scroll if it is done once
}
const sectionObserver = new IntersectionObserver(revealSection, {root: null, threshold: 0.15}); //only observe when it is 15 percent visible

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


///////////////////////////////////////////////////////////////////////////////////
//LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]'); //select img elements which is having data-src attribute
const loadImage = function(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  //Replace img src with data-src
  entry.target.src = entry.target.dataset.src; //replacing the source image happens behind the scene, 
  //once JS finish the loading image, it will emit the "load" event
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImage, {root: null, threshold: 0, rootMargin: '200px'});

imgTargets.forEach(img => imgObserver.observe(img));


///////////////////////////////////////////////////////////////////////////////////
//SLIDER
/*
//bringing all images in one screen 
const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.4) translateX(-1500px)';
slider.style.overflow = 'visible';
*/

const slider = function () {
  //variables

  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let currentSlide = 0;
  const maxSlide = slides.length;

  //Functions

  const createDots = function () {
    slides.forEach(function (_, i) {
      //adding as last child of dots container  based on data-slide attribute
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    //first remove active class if there is any
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    //Add active class
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slideNo) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slideNo) * 100}%)`)
    ); //1st img --> 0%, 2nd --> 100%, 3rd --> 300% ---> nth img --> n*100%

    activateDot(slideNo);
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) currentSlide = 0;
    else currentSlide++;

    goToSlide(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlide - 1;
    else currentSlide--;

    goToSlide(currentSlide);
  };

  //Initialize slider for first time
  const init = function () {
    createDots();
    goToSlide(0);
  };

  init();

  //Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //Adding keyboard event ot slide the slider with left and right arrow key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  //Adding click functionality to dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // const slide = e.target.dataset.slide; //variable name and value name which we are fetching are same (slide), so we can use destructuirng
      const { slide } = e.target.dataset;
      goToSlide(slide);
    }
  });
};

slider();
































///////////////////////////////////////////////////////////////////////////////////
// LECTURES


//How DOM works behind the scenes, or How the DOM is organised internally ?
/*
Dom is interface between JavaScript and browser.
It allows us to make Javascript Interact with browser.
We can write Javascript to create, modify and delete HTML elements; set styles, classes and attributes; and listen and respond to events.
DOM tree is generated from an HTML document, which we can then interact with.
DOM is a very complex API that contains a lots of methods and properties to interact with the DOM tree.

Image in eBook (DOM methods)

*/





/*

//Selecting, Creating and Deleting Elements

//selecting entire document.
console.log(document.documentElement);
console.log(document.head); //selecting Head
console.log(document.body); //selecting body

//Selecting Elements
const header = document.querySelector('.header'); //will select the first element with matching selector
const allSections = document.querySelectorAll('.section'); //returns nodeList
console.log(allSections); //will select the all element with matching selector

document.getElementById('section--1'); //will select the element have the given id
const allButtons = document.getElementsByTagName('button'); //will select all the elements having the given element name 
console.log(allButtons); //returns HTMLCollection, if the DOM changes the this collection also gets updated immediately.

document.getElementsByClassName('section'); //all elements having given class name  --> return HTMLCollection


//creating and inserting elements
//.insertAdjacentHTML -->one way(seen earlier)

//other way
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';
// header.prepend(message);
header.append(message); //can be added only once, so will be removed from top and added to to bottom of header
//to add at below also, we need to use cloneNode
// header.append(message.cloneNode(true));


//adding before and after as a sibling
// header.before(message);
// header.after(message); //above al will be removed and last one will be applicable




//Deleting Elements
document.querySelector('.btn--close--cookie').addEventListener('click', function(){
  message.remove(); //new way

  //old way
  // message.parentElement.removeChild(message); 
});



//STYLES, ATTRIBUTES and CLASSES

//Styles
//Inline style
message.style.backgroundColor = '#37383d';
message.style.width = '103.52%';

//get styles applied to element
console.log(message.style.color); //only gives result if we have applied any inline style  --> it will not log anything as we have not set color in inline style
console.log(message.style.backgroundColor); //only gives result if we have applied any inline style   --> rgb(55, 56, 61)

//getting all styles applied to element 
console.log(getComputedStyle(message)); //will return all the css style. return type --> CSSStyleDeclaration
console.log(getComputedStyle(message).color); //will return all the colors
console.log(getComputedStyle(message).height); 

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//CSS setProperties   
document.documentElement.style.setProperty('--color-primary', 'orangered') //changing css properties or variables which are at root level or document.documentElement


//ATTRIBUTES --> src, height, width are all called attributes in img element
const logo = document.querySelector('.nav__logo');
//accessing standard attributes --> The attributes which is known by html not defined by us
console.log(logo.alt); //Bankist logo
console.log(logo.src);  //file:///Users/kumarpur/learning/JS/13-Advanced-DOM-Bankist/final/img/logo.png  -->Gives absolute path
console.log(logo.getAttribute('src')); //img/logo.png  --> gives relative path
logo.alt = 'Beautiful minimalist logo'
console.log(logo.alt);

//accessing non-standard attributes --> (added extra designer attribute in img element of nav__logo class)
console.log(logo.designer); //undefined

console.log(logo.getAttribute('designer')); //Purushottam
//if we can get, we can set also
logo.setAttribute('company', 'Bankist');


//DATA Attributes  --> Special attribute that starts with word 'data' --> its values are stored in dataset
console.log(logo.dataset.versionNumber); //3.0 --> set in html attribute




//CLASSES
logo.classList.add('a','b');
logo.classList.remove('a','b');
logo.classList.toggle('a');
logo.classList.contains('b');

*/


/*

//TYPES OF EVENTS AND EVENT HANDLERS
const h1 = document.querySelector('h1');
const alertH1 = function(e){
  alert('Hovered on H1');
  //prevent eventlistening next time
  // h1.removeEventListener('mouseenter', alertH1);
}
h1.addEventListener('mouseenter', alertH1);


//other way  --> old way
h1.onmouseenter = function(e){
  alert('Hovered on H1');
};

setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 5000);

*/


/* 



//smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  const sec1coord = section1.getBoundingClientRect(); //getting coordinate of section1 element

  console.log(sec1coord); //{"x": 0, "y": 622, "width": 1728, "height": 1858.390625, "top": 622, "right": 1728, "bottom": 2480.390625, "left": 0}

  console.log(e.target.getBoundingClientRect()); //will gove coordinates of current button element getting clicked
  //getBoundingClientRect() --> gives relative coordinate of current viewport

  //get scroll distance from top and left
  console.log('current scroll (x/y)',window.pageXOffset, window.pageYOffset);  //0 300     (top scrolled)
  console.log('height/width of viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);


  //scrolling  --> arguments : left , top
  // window.scrollTo(sec1coord.left + window.pageXOffset, sec1coord.top + window.pageYOffset); //how much scrolled + current coordinate

 
  //Old schoolway of scrolling 
  window.scrollTo({
    left: sec1coord.left + window.pageXOffset, 
    top: sec1coord.top + window.pageYOffset,
    behavior: 'smooth'
  });
  

  //modern way of scrolling  --> works in modern browsers only
  // section1.scrollIntoView({behavior: 'smooth'});
})

*/




/*



//EVENT PROPOGATION : BUBBLING and CAPTURING

//When any event happens at any element, the is caputured at root document and then comes to that targent element, visiting all parent elements.
//and then the event handler bubbles up to all the parent elements
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min );
const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

//Add event listener to one menu and apply the listener change to all menus and menu bar (parents of that menu)
document.querySelector('.nav__link').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  console.log('link', e.target);
  console.log('link', e.currentTarget);



  //Stop Event Propogation
  // e.stopPropagation(); //now its parent elements will not listen to handlers


});

document.querySelector('.nav__links').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor(); //this will also executed without click becuase click is happening to its child
  console.log('all menu', e.target); //target will be same of single menu item getting clicked --> where was event originated
  console.log('all menu', e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor(); //this will also executed without click becuase click is happening to its child
  console.log('navbar', e.target); //target will be same of single menu item getting clicked --> where was event originated
  console.log('navbar', e.currentTarget); 
});

*/


/*

//DOM TRAVERSING

const h1 = document.querySelector('h1');

//going downwards --> selecting child element
console.log(h1.querySelectorAll('.highlight')); //will select all highlight class element inside h1 element, not outside of that
console.log(h1.childNodes); //will give all child nodes of h1, including text comment, elements, etc...
console.log(h1.children); //will give all direct children elements
console.log(h1.firstElementChild); //will give first child element
console.log(h1.lastElementChild); //will give first child element
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//going upwards --> selecting parents
console.log(h1.parentNode); //selects all parents above that elements
console.log(h1.parentElement); //selects aprent
//first parent with given class name
h1.closest('.header').style.background = 'var(--gradient-secondary)';


//going sideways --> selecting siblings
//we can only select direct siblings, previous and next siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling); //previous node
console.log(h1.nextSibling); //next node

//to get all siblings --> move up to parent and read all children from there.
console.log(h1.parentElement.children); 
[...h1.parentElement.children].forEach(function(el){
  if(el !== h1) el.style.transform = 'scale(0.5)';
})

*/

/*

//The Intersecion Observer API  --> https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22648993#overview
//This api allows our code to observe changes to the way that a certain target element intersects another element 
//or the way it intersects the viewport
const observerCallbackfunc = function(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  })
}
const observerOptions = {
  root: null, //null because we want our target to intersect with whole viewport
  threshold: [0, 0.2] //threshold is from where we want intersection to be done, 0 means with start of page, 0 percent of target is visible, 0.2 means 20% of target visible (section1)
}
const observer = new IntersectionObserver(observerCallbackfunc, observerOptions);
observer.observe(section1); //observe a target

*/


/*

//LIFECYCLE OF DOM EVENTS ----> LIFECYCLE:  page loading to user leaving the page

//Domcontent Loaded  --> Event fired as soon as the completed html is parsed and converted into the DOM tree
//does not wait for images or other external resources to load
//just html and javascript need to be loaded
document.addEventListener('DOMContentLoaded', function(e) {
  console.log(e);
})

//when complete resource has been loaded
window.addEventListener('load', function(e) {
  console.log(e);
})

//will execute before leaving the page
window.addEventListener('beforeunload', function(e) {
  console.log(e);
  e.preventDefault();
  e.returnValue = ''; //will show a message, --> are you sure you want to leave?
})


*/


//Different ways of loading JS in HTML 

//Regular way --> if added in head, the html parsing will wait till js if fetched and executed, may be the html element may not be available,(not recommended)   if added at the last of body it will parse the html first then will fetch and execute js
//<script src="script.js"></script> //supported in old browsers , rest are only supported in modern browsers becuase rest are features of html 5

//using Async attribute  --> Added in head yag of html --> will parse the html as well as fetch the script from js --> will wait while executing the JS --> after that it finishes parsing and build dom tree, -->
// domContentLoaded will not wait for all scripts to be downloaded and executed, it if fired as soon as parsing finishes, can cause issue in case big script takes time to load
//scripts are not guaranteed to executed in order
//<script async src="script.js"></script> 

//using defer attribute --> Added in head tag of html --> will parse html and fetch js at the same time, but will execute js after parsing finishes. and then only fires the DOMContentLoaded --> scripts are guaranteed to execute in order
//<script defer src="script.js"></script>  //best solution