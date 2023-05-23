//Functions and observabeles are same but observable returns many values.

import { Observable } from "rxjs";

export function functionObs() {
  console.log("Function call");
  return '1';
  return '2'; //dead code, compiler will not reach here
}

export const funcObservable = new Observable(observer => { //Observables doesn't take any arguments
  console.log("Observable call");
  observer.next('1');
  observer.next('2'); // we can return multiple values.
  setTimeout(() => {
    observer.next('3');
  }, 2000);
})