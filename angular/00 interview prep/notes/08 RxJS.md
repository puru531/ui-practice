# RxJS & Observables
- [RxJS & Observables](#rxjs--observables)
  - [RxJS](#rxjs)
  - [Observables](#observables)
  - [Operators](#operators)
  - [Subjects](#subjects)
  - [Schedulers](#schedulers)
  - [Subscription](#subscription)
  - [Error Handling](#error-handling)
  - [Testing](#testing)

## RxJS
- Reactive Extensions for JavaScript
- Library for composing asynchronous and event-based programs by using observable sequences
- Provides a core type, `Observable`, various static operators, and instance operators
- Observable: Represents the idea of an invokable collection of future values or events
- Observer: Is a collection of callbacks that knows how to listen to values delivered by the Observable
- Subscription: Represents the execution of an Observable, is primarily useful for cancelling the execution
- Operators: Pure functions that enable a functional programming style of dealing with collections with operations like `map`, `filter`, `concat`, `reduce`, etc
- Subject: Is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers
- Schedulers: Are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. `setTimeout` or `requestAnimationFrame` or others
- Subscription: Represents the execution of an Observable, is primarily useful for cancelling the execution
- Error Handling: RxJS provides a variety of operators that can be used to handle errors
- Testing: RxJS provides a variety of utilities to test observables

## Observables
- Observables are lazy Push collections of multiple values
- Observables are declarative; computation only starts when we subscribe to it
- Observables are cancellable; when we unsubscribe, the computation stops
- Observables are like functions with zero arguments, but generalize those to allow multiple values
- Observables can be created from events, promises, callbacks, etc

### Creating and using Observables
```typescript
export class MyComponent implements OnInit {
  private subscriptions: Subscription;

  ngOnInit(): void {
    const observable = new Observable<string>(subscriber => {
      subscriber.next('Hello');
      subscriber.next('World');
      subscriber.complete();
    });

    //subscribe to the observable
    thsi.subscription = observable.subscribe({
      next: value => console.log(value),
      error: error => console.error(error),
      complete: () => console.log('Done')
    });
  }

  //unsubscribe when component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

```

## Operators
- Operators are pure functions that enable a functional programming style of dealing with collections
- Operators take configuration options, and they return a function that takes a source observable
- When you call a method on an Observable instance, it does not change the existing Observable instance. Instead, it returns a new Observable, whose subscription logic is based on the first Observable
- Operators can be chained to compose complex data queries

## Subjects
- Subjects are observables themselves but what sets them apart is that they are also observers
- A Subject is like an Observable, but can multicast to many Observers
- Subjects are like EventEmitters: they maintain a registry of many listeners
- Every Subject is an Observer. It is an object with the methods `next(v)`, `error(e)`, and `complete()`
- Subjects are useful for multicasting a value to many Observers

Examples:
```typescript
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

//emit 1
subject.next(1);
//emit 2
subject.next(2);

//output
//observerA: 1
//observerA: 2

```
### Types of Subjects
- `Subject`: A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners
- `BehaviorSubject`: A variant of Subject that requires an initial value and emits its current value whenever it is subscribed to
Example:
```typescript
import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.next(1);

//output
//observerA: 0
//observerA: 1

```
- `ReplaySubject`: A variant of Subject that records multiple values from the Observable
Example:
```typescript
import { ReplaySubject } from 'rxjs';

const subject = new ReplaySubject(2); // buffer 2 values for new subscribers

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

//emit data
subject.next(1);
subject.next(2);
subject.next(3);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

//output
//observerA: 1
//observerA: 2
//observerA: 3
//observerB: 2
//observerB: 3

```
- `AsyncSubject`: A variant where only the last value of the Observable execution is sent to its observers, and only when the execution completes 
Example:
```typescript
import { AsyncSubject } from 'rxjs';

const subject = new AsyncSubject();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

// emit data
subject.next(1);
subject.next(2);
subject.next(3);
subject.complete();

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

//output
//observerA: 3
//observerB: 3


```

### Multicasting
- Multicasting is the practice of broadcasting to a list of multiple subscribers in a single execution
- Multicasting is done using Subjects
- Multicasting is useful when you have multiple subscribers that are interested in the same data

## Schedulers
- Schedulers are centralized dispatchers to control concurrency
- Schedulers are like virtual threads that allow you to coordinate when computation happens on e.g. `setTimeout` or `requestAnimationFrame` or others
- Schedulers are also used to run tests in a synchronous way, by making time be virtualized

## Subscription
- A Subscription essentially just has an `unsubscribe()` function to release resources or cancel Observable executions
- A Subscription has one important method, `unsubscribe()`, that takes no argument and just disposes of the resource held by the subscription
- Subscriptions can also be put together, so that a call to an unsubscribe() of one Subscription may unsubscribe multiple Subscriptions 

## Error Handling
- RxJS provides a variety of operators that can be used to handle errors
- Operators like `catchError` and `retry` can be used to handle errors
- Errors can be thrown using the `throwError` creation function

## Testing
- RxJS provides a variety of utilities to test observables
- The `TestScheduler` can be used to test observables in a synchronous and controlled way
- The `cold` and `hot` creation functions can be used to create observables for testing
- The `marble testing` syntax can be used to describe the behavior of observables in a simplified manner  


# Signals vs Observables
Observables are a way to handle asynchronous data streams. They are very similar to Signals, but with some key differences:

- Observables are lazy, while Signals are eager. This means that Observables only start emitting values when they are subscribed to, while Signals start emitting values as soon as they are created.
- Observables can be cancelled, while Signals cannot. This means that you can stop an Observable from emitting values by unsubscribing from it, while a Signal will continue to emit values until it is destroyed.
- Observables can emit multiple values, while Signals can only emit one value. This means that Observables can emit a stream of values over time, while Signals can only emit a single value.
- Observables can be transformed using operators, while Signals cannot. This means that you can apply a wide range of transformations to an Observable, such as filtering, mapping, and combining, while a Signal is limited to the operations provided by the Signal class.

In general, Observables are more flexible and powerful than Signals, but they are also more complex to work with. If you need to handle a simple asynchronous data stream, Signals may be a better choice. If you need more control and flexibility, Observables are the way to go.

## Convert Signals to Observables
```typescript
import { toObservable } from '@angular/core/rxjs-interop';

clickCount = signal(0);
clickCount$ = toObservable(this.clickCount)

ngOnInit() {
  this.clickCount$.subscribe(value => {
    console.log('Click count:', value);
  });
}
```
## Convert Observables to Signals
```typescript
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

interval$ = interval(1000);
intervalSignal = toSignal(this.interval$, {
  initialValue: 0
});

constructor() {
  effect(() => {
    console.log('Interval:', this.intervalSignal());
  });
}
```

# Creating & Using a custom Observable from scratch
```typescript

export class AppComponent implements OnInit {
  customInterval$ = new Observable((subsciber)=> {
    subsciber.next(0);
    let count = 1;
    const interval = setInterval(() => {
      if(count === 10) {
        clearInterval(interval);
        subsciber.complete();
      }
      subsciber.next(count);
      count++;
    }, 1000);
  });

  ngOnInit() {
    this.customInterval$.subscribe(value => {
      console.log('Custom Interval:', value);
    });

    //OR
    this.customInterval$.subscribe({
      next: value => console.log('Custom Interval:', value),
      error: error => console.error(error),
      complete: () => console.log('Custom Interval: Done')
    });
  }
}

```