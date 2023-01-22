'use strict';

//What is object oriented programming ?
/*
A programming paradigm that is based on objects. --> paradigm : style of the code.(how we write and organize code)
We use objects to represent abstract real world objects.

objects can contain properties and methods. By using objects we pack data and corresponding behaviors into one block.
in OOP, objects are self contained block of code.
Objects are building blocks of application, and interact with one another.

Interaction happens through a public interface (API) : methods that the code outside of the object can access and use to communicate with the object.


traditional oop
Classes and instances
Classes  --> a blueprint from which we create new objects, A class itself is not an object, its instance is the real object.


4 fundamental principles of object oriented programming.

Abstractions --> And abstraction basically means to ignore or to hide details that don't matter. 
                This allows us to get an overview perspective of whatever it is that we're implementing instead of messing with details that don't really matter to our implementation.

Incapsulation --> And encapsulation basically means to keep some properties and methods private inside the class so that they're not accessible from outside the class.
                However, some methods can, of course, be exposed as a public interface, which we call API.

Inheritance -->  In OOP, when we have two classes that are closely related,  we can have one class inherit from the other. 
                So we will have one parent class and one child class, and the child class then extends the parent class.
                inheritance makes all properties and methods of a certain class available to a child class, which of course then forms a hierarchy between these two classes.
                And the goal of this is to reuse logic that is common to both of the classes.
                A child class can then also have its own methods and properties.

Polymorphism -->   polymorphism means that a child class can overwrite a method that it inherited from a parent class.
*/


//OOP in JavaScript
/*
In JavaScript we have something called prototypes and all objects in JavaScript are linked to a certain prototype object.
So we say that each object has a prototype.

So, the prototype object contains methods and properties that.. -->...all the objects that are linked to that prototype can access and use.
And this behavior is usually called prototypal inheritance.

objects delegate behavior(methods) to the linked prototype object.

how do we implement Object-Oriented Programming in JavaScript?
in JavaScript there are actually three different ways of doing all this: 

--> constructor function : constructor functions are a way of creating objects programmatically,
                            using a function which will also set the new object's prototype.
                            And this is actually how built-in objects like arrays or maps or sets are implemented.
                            Also, this is how OOP has been done in JavaScript since the beginning.

--> ES6 classes :  ES6 classes are actually the more modern way of doing OOP in JavaScript.
                ES6 classes are basically just a layer of abstraction over constructor functions.
                it's really just a nicer syntax that makes it easier for newcomers to do OOP in JavaScript.
                But behind the scenes, ES6 classes are actually implemented with constructor functions.And so they also use prototypal inheritance.

--> Object.create(): The easiest and most straightforward way of linking an object to a prototype object.
        However, it's not as used as the other two methods.
*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Function Constructor
/*
const Person = function(firstName, birthYear){ //constructor function name should be in Capitalized form. 
    //only supports function expression and function declaration. Arrow functions are not supported because this keyword is not present in Arrow functions.
    
    //creating properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    //Never create methods inside constructor functions. --> use prototype and prototype inheritance instead.
    // const calcAge = function() {
    //     console.log(2023 - birthYear);
    // }
};

// we call the constructor function using the new keyword.
const puru = new Person('Purushottam', 1997); //it works only with function constructor and ES6 classes, not with object.create
console.log(puru);
//when we use new keyword to call constructor function, it happens in 4 steps:
// 1. New {} is created.
// 2. function is called, and this keyword points to the newly created object.
// 3. Newly created object {} is linked to the prototype.
// 4. function automatically returns the {}


//Now we can create as many objects as of Person constructor we want.
const shwet = new Person('Shweta', 1997);
console.log(shwet);
const prerit = new Person('Prerit', 2023);
console.log(prerit);

console.log(puru instanceof Person); //true




//Prototypes
    //each and every function in JavaScript automatically has a property called prototype. And that includes constructor functions.
    //Now every object that's created by a certain constructor function will get access to all the methods and properties that we define on the constructors prototype property 
//setting method to prototype
Person.prototype.calcAge = function() {
    console.log(2023 - this.birthYear);
};

//As each object created from constructor has access to the methods of the Person constructor, we can now use calcAge;
puru.calcAge(); //calcAge is not directly available in puru object, but when we execute puru.calcAge, JS looks for method, and when it is not found, it looks for its __proto__ property and there it is available, this is known as prototypal inheritance / delegation
shwet.calcAge();
prerit.calcAge();

//knowing prototype of object created from constructor
console.log(puru.__proto__);
console.log(puru.__proto__ === Person.prototype);  //true
console.log(Person.prototype.isPrototypeOf(puru));  //true    .. Person.prototype is prototypeOfLinkedObject

//setting properties to prototype
Person.prototype.species = 'Homo sapiens';
console.log(puru, shwet, prerit);
console.log(puru.hasOwnProperty('firstName')); //true  --> own properties are only those which are set in object from constructor
console.log(puru.hasOwnProperty('species')); //false --> set in prototype, so it is not own property of object



//Prototypal inheritance on built-in objects

//Person.prototype
console.log(puru.__proto__); //prototype of person object
//Object.prototype (top of the prototype chain)
console.log(puru.__proto__.__proto__); //prototype of object prototype (prototype of parent object of person object)  --> protype chaining

console.log(puru.__proto__.__proto__.__proto__); // o/p -> null ---> because object.prototype is top of the scope chain

console.dir(Person.prototype.constructor); // points back to person



const arr = [12,23,3,43,43,4,4,545,456,65,65,65,65,3,23,2334];
console.log(arr.__proto__); //will display all the methods available for array object prototype
console.log(arr.__proto__ === Array.prototype); //true

console.log(arr);
//we can create custom methods for objects --> extending prototype (not recommended)
Array.prototype.unique = function() {
    return [...new Set(this)];
}

console.log(arr.unique());




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//ES6 classes  --> It also implements prototype instances behind the scenes

//Classes are not hoisted (we cannot use before it is declared)
//Classes are first class citizens (we can pass it in function and return it from funtion)
//Classes are executed in strict mode


//class expression
// const PersonClExp = class {};

//class declaration
class PersonCl {
    //this constructor will be called when we create object of PersonCl class using new keyword
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    //methds can be added here --> will be added to the prototype property  (instance method)
    calcAge() {
        console.log(this.fullName, 2023 - this.birthYear);
    }

    //getter  --> explained below
    get age() {
        return 2023 - this.birthYear;
    }

    //setter can be used in data validation
    set fullName(name) {
        if(name.includes(' ')) this._fullName = name; //Adding underscore to create a new variable, becuase this property and constructor both have the same name and try to set the value to same property
        else alert(`${name} is not a full name`);
    }

    //as we have create new variable _fullName, we again need to to set the value of normale fullName property
    get fullName() {
        return this._fullName;
    }

    //static method
    static hey() { 
        console.log("hey there 👋");
    }
}

const pragya = new PersonCl('Pragya Yadav', 2023);
console.log(pragya);
pragya.calcAge();

console.log(pragya.__proto__ === PersonCl.prototype); //true

//Manually adding a method to the class
PersonCl.prototype.greet = function() {
    console.log(`Hello ${this.fullName}`);
};

console.log(pragya);
pragya.greet();

console.log(pragya.age)


//SETTERS AND GETTERS

//Every object in JavaScript can have getter and setter properties  --> used get and set a value
const account = {
    owner: 'Purushottam',
    movements: [200, 300, 3400, 2300, 8000, 820, 1000, 2300],

    //getter
    get latest() {
        return this.movements.slice(-1).pop();
    },

    //setter  --> needs exactly one parameter
    set latest(mov) {
        this.movements.push(mov);
    }
}

console.log(account.latest); //we are not using it as a menthod but as a property of the account

//using setter --> just setting the value like a property
account.latest = 5000;

//Getters and setters also works for classes, added in class declareed above



//STATIC METHODS
//Methods that are availble in constructor function and not in the prototype of constructor
//[1,2,3].from does not work but Array.from(....) works, becuse from is not available in Array.prototype

//Creating static method which is not in prototype
Person.hey = function() {
    console.log('hey there 👋');
    console.log(this); //entire constructor function
}

//calling static method
Person.hey();
//Status method is not inherited to the object
// puru.hey(); //script.js:262 Uncaught TypeError: puru.hey is not a function

//We can also add static methods to ES6 classes --> Added above in PersonCl class





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//OBJECT.CREATE
//Also has prototype inheritance
//no prototype properties
//no constructor functions
//no new keyword

//we use object.create to manually set prototype of any other object we want

//creating prototype of all person objects
const PersonProto = {
    calcAge() {
        console.log(this.firstName, 2023 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

//a new object that is linked to the the protype PersonProto
const purushottam = Object.create(PersonProto);

console.log(purushottam); //{}  empty object, but in prototype, we have calcAge method
//setting properties
purushottam.name = 'Purushottam';
purushottam.birthYear = '1997';

//calling method from prototype
purushottam.calcAge();

console.log(purushottam.__proto__); //{calcAge: ƒ}  showing method declared in prototype
console.log(purushottam.__proto__ === PersonProto); //true


//another object
const shweta = Object.create(PersonProto);
//setting properties
shweta.init('Shweta', 1997);
shweta.calcAge();

*/



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//INHERITABCE BETWEEN CLASSES (CONSTRUCTOR FUNCTION, ES6 CLASS AND OBJJECT.CREATE)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//INHERITABCE BETWEEN CLASSES (CONSTRUCTOR FUNCTION)
/*
//Here we are creating a Person class and Student class which will inherit from Person class
//Person class
const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}
//prototype method of Person class
Person.prototype.calcAge = function() {
    console.log(2023 -  this.birthYear);
}

//student class having properties of Person class and some additional properties
const Student = function(firstName, birthYear, course) {
    // this.firstName = firstName;//duplicate code which is available in Person class
    // this.birthYear = birthYear;
    Person.call(this, firstName, birthYear); //instead we can use Person class by providing value of this keyword by using call method and passing 'this'
    this.course = course;
}

//inheriting Person.prototype to Student.prototype  --> linking prototype
Student.prototype = Object.create(Person.prototype); // object.create will return empty object after that we can add more methods to it

//student class prototype method
Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

//creating new student object
const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
//after prototype of person is linked to prototype of student, now we can use methods of person.prototypes
mike.calcAge();

//point the student class to Student constructor
Student.prototype.constructor = Student; //earlier it was pointing to Person because we used Object.create to create Stdent prototype

//prototype chaining --> the object mike is now intance of both person and student and Object(parentof person)
console.log(mike instanceof Student); //true
console.log(mike instanceof Person); //true
console.log(mike instanceof Object); //true



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//INHERITABCE BETWEEN CLASSES (ES6 CLASSES)

class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    calcAge() {
        console.log(this.fullName, 2023 - this.birthYear);
    }
    get age() {
        return 2023 - this.birthYear;
    }
    set fullName(name) {
        if(name.includes(' ')) this._fullName = name; //Adding underscore to create a new variable, becuase this property and constructor both have the same name and try to set the value to same property
        else alert(`${name} is not a full name`);
    }
    get fullName() {
        return this._fullName;
    }
    static hey() { 
        console.log("hey there 👋");
    }
}

//we use extend for inheritance --> allows us to use Person.prototype methods
class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course) {//if we don't need any property in child class then we don't need to have this constructor block itself, no super also
        //Always needs to happen first
        super(fullName, birthYear); //super is constructor function of parent class
        this.course = course;
    }

    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    //overridng parent method --> (Polymorphism)
    calcAge() {
        console.log(`${2023 - this.birthYear} years old.`);
    }
}

const martha = new StudentCl('Martha Jones', 1994, 'Computer Science');
console.log(martha);
martha.introduce();
martha.calcAge();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//INHERITABCE BETWEEN CLASSES (Object.create)

//creating prototype of all person objects
const PersonProto = {
    calcAge() {
        console.log(this.firstName, 2023 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

//a new object that is linked to the the protype PersonProto
const purushottam = Object.create(PersonProto);

//creating student object prototype of all person objects
const StudentProto = Object.create(PersonProto);

//overriding init function
StudentProto.init = function(firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

StudentProto.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

//student using the protype StudentProto
const jay = Object.create(StudentProto); //jay inherited from the protype StudentProto and the protype StudentProto inherited from the protype PersonProto

jay.init('Jay', 2004, 'Computer Science');
jay.introduce();
jay.calcAge();


*/



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ANOTHER CLASS EXAMPLE
/*
class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;
        //creatiung properties which we will not pass every time
        this.movements = [];
        this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${this.owner}!`);
    }
    //Public interface of object
    deposit(amount) {
        this.movements.push(amount);
    }
    withdraw(amount) {
        this.deposit(-amount);  //Abstraction --> how withdraw amount is getting stored, that acc1 object does not know
    }
}

const acc1 = new Account('Puru', 'INR', 1111);
// acc1.movements.push(5000);
// acc1.movements.push(-500);
acc1.deposit(5000);
acc1.withdraw(500);
console.log(acc1);

*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ENCAPSULATION --> Protected properties and methods
//ENCAPSULATION --> keep some properties and methods private inside the class
//                --> Prevent code outside of the class to manipulate the data


//CLASS FIELDS --> 4 fields
    //1. Public fields
    //2. Private fields
    //3. Public methods
    //4. Private methods
//There is also static version of above all --> static : available in class only, not in the object.





class Account {
    //1. Defining public fields --> semicolon needed 
    locale = navigator.language; //public fields are instanciated for all objects we create, and they will not be in prototype
    
    //2. Private fields (available in instances, not in prototype)
    #movements = []; 
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        //creating properties which we will not pass every time
        // this._movements = []; //adding underscore for encapsulation, but this does not make the property truly private --> called protected property, anyone can access and change but _ indicated that this is protected, don't touch it
        // this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${this.owner}!`);
    }

    //3. Public methods
    //Public interface of object
    deposit(amount) {
        this.#movements.push(amount);
        return this; //returning 'this' for chaining methods
    }
    withdraw(amount) {
        this.deposit(-amount);  //Abstraction --> how withdraw amount is getting stored, that acc1 object does not know
        return this; //returning 'this' for chaining methods
    }

    
    requestLoan(amount) {
        // if(this.#approveLoan(amount)) {
        if(this._approveLoan(amount)) {
            console.log('Loan approved');
            this.deposit(amount);
            return this; //returning 'this' for chaining methods
        }
    }

    //4. Private methods  --> not suuported by any browsers yet, chrome treats it as a private field
    // #approveLoan(amount) {
    _approveLoan(amount) {
        return true; 
    }
}

const acc1 = new Account('Puru', 'INR', 1111);
console.log(acc1);
// console.log(acc1.#movements); //error --> Property '#movements' is not accessible outside class 'Account' because it has a private identifier.
// console.log(acc1.#pin);




//CHAINING METHODS
acc1.deposit(3000).deposit(2100).withdraw(1000).requestLoan(20000).withdraw(5000);
console.log(acc1);