// import {Component, computed, input, Input} from '@angular/core';
import {Component, EventEmitter, Input, output, Output} from '@angular/core';

// type User = {avatar: string, name: string, id: string};
interface User {avatar: string, name: string, id: string};
/*
INTERFACE: An interface is a way to define a contract in your code. This contract includes the data types of the properties and methods that a class must implement.
TYPE : A type is a way to define a custom data type in TypeScript. It can be used to define the shape of an object, a function, or any other custom data type.

Interface VS Type:
1. Interfaces are used to define the shape of an object, while types are used to define custom data types.
2. Interfaces can be extended, while types can be aliased.
3. Interfaces can be implemented by classes, while types cannot.
4. Interfaces can be used to define optional and required properties, while types cannot.

 */

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  /* --------------- Regular input ------------- */

  // receiving data from parent component
  // @Input({required:true}) user!: User; // ! is used to tell TypeScript that the property will be initialized later
  // @Input() user?: User; // optional to be passed from parent component
  @Input({required:true}) user?: User; // required to be passed from parent component

  /* ---------- Using Signal input -------------- */
  /*avatar = input.required<string>();
  name = input.required<string>();*/

  // NOTE : These signal input are read-only. We can't set the value to these signal input properties.
  // this.avatar.set(Something); --> will not work






  /* ------------------ Event Emitters ---------------- */
  @Output() selectUser = new EventEmitter<string>();


  /*----------- Modern alternative of @Output() - NOT a signal -------------- */
  // Uses output function instead of @Output decorator
  // selectUser = output<string>();







  // imagePath = computed(()=>  'assets/users/' + this.avatar());
 get imagePath() {
    return 'assets/users/' + this.user?.avatar;
  }

  onSelectUser() {
   this.selectUser.emit(this.user?.id);
  }
}




/*======================================= Signal =====================================

export class UserComponent {
  // we can create variables in the class and use them in the template. let and const are not needed for class properties.
  // we can use private, or can keep it public. If we don't specify anything, it is public by default.
  selectedUser = signal(DUMMY_USERS[randomIndex]); // using signal
  //selectedUser = DUMMY_USERS[randomIndex];


  //getter function --> getter function is used to get the value of a property
  // get imagePath() {
  //   // return 'assets/users/' + this.selectedUser.avatar;
  //   return 'assets/users/' + this.selectedUser.avatar;
  // }


  // getting imagePath from signal:
  // computed is used to get the value of a property.
  // When we use computed, when it receives a new value only then it re calculates the value.
  imagePath = computed(() =>  'assets/users/' + this.selectedUser().avatar)

  onSelectUser() {
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUser.set(DUMMY_USERS[randomIndex]); // setting data to signal
    // this.selectedUser = DUMMY_USERS[randomIndex];
  }

}

 */

/*
-------------- HOW ANGULAR CHANGE DETECTION WORKS ----------------
Angular updates the UI when a change is detected in the component.
Angular uses Zone.js to detect changes in the component. Zone is part of the Angular.
Zone.js is a library that monkey patches the browser API to detect changes in the component.

Zone.js automatically listens to all possible user events that could occur on the website. And other events like setTimeout, setInterval, etc.
When such events occur, Zone.js triggers the change detection in the Angular application.
 */

/*
-------------- CHANGE DETECTION USING SIGNALS ----------------
Angular uses signals to detect changes in the component. When a signal is emitted, Angular updates the UI.
Signals are emitted when the component property changes.
Angular uses the following signals to detect changes:
1. DOM events
2. XHR requests
3. Timers (setTimeout, setInterval)
4. Promises
5. Observables
6. Web Workers
7. MutationObserver
8. User events (click, keyup, etc.)
9. Zone.js


How to use signals to detect changes in the component?
1. import signal from '@angular/core'
2. Create a signal value and store it in a property of component class

  selectedUser = signal(DUMMY_USERS[randomIndex]);

Setting data to signal
  this.selectedUser.set(DUMMY_USERS[randomIndex]);

Access in HTML :
<span>{{ selectedUser().name }}</span> // calling the signal function to get the value

 */
