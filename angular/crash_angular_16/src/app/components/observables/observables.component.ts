import { Component } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  ReplaySubject,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { MyServiceService } from 'src/app/services/my-service.service';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss'],
})
export class ObservablesComponent {
  /**
   * Observables: Observables are a new way of handling async events in Angular.
   * Observables are similar to promises but with some differences.
   * Observables are lazy, which means they are not executed until we subscribe to them.
   * Observables are cancellable, which means we can cancel the execution of the observable.
   * Observables can be used to handle multiple values over time.
   * Observables can be used to handle errors.
   * Observables can be used to handle completion.
   *
   */

  constructor(private myService: MyServiceService) {}

  ngOnInit() {
    // Observables are created using the Observable class from the rxjs library.
    // We can create an observable using the create() method of the Observable class.
    // The create() method takes a function as an argument.
    // The function takes an observer as an argument.
    // The observer has three methods: next(), error(), and complete().
    // The next() method is used to emit the values.
    // The error() method is used to emit the error.
    // The complete() method is used to emit the completion.
    const observable = new Observable((observer) => {
      observer.next('Hello World');
      observer.next('Hello Angular');
      observer.complete();
    });

    // We can subscribe to the observable using the subscribe() method.
    // The subscribe() method takes three arguments: next(), error(), and complete().
    // The next() method is called when the observer emits a value.
    // The error() method is called when the observer emits an error.
    // The complete() method is called when the observer emits a completion.
    observable.subscribe({
      next: (value) => console.log(value),
      error: (error) => console.log(error),
      complete: () => console.log('Completed'),
    });

    // We can also use the subscribe() method to handle only the next() method.
    observable.subscribe((value) => console.log(value));

    // We can also use the subscribe() method to handle only the error() method.
    observable.subscribe({
      error: (error) => console.log(error),
    });

    // Cancelling the observable
    // We can cancel the observable using the unsubscribe() method.
    // The unsubscribe() method is returned by the subscribe() method.
    const subscription = observable.subscribe({
      next: (value) => console.log(value),
    });

    subscription.unsubscribe();

    //////////////////////////////////////////////////////////////////////////
    // Observables with operators
    // Operators are functions that are used to manipulate the values emitted by the observable.
    // There are many operators available in the rxjs library.
    // We can use the pipe() method to apply the operators to the observable.
    // The pipe() method takes the operators as arguments.
    // We can use the map() operator to transform the values emitted by the observable.
    // The map() operator takes a function as an argument.
    // The function takes the value emitted by the observable as an argument.

    const observableWithOperators = new Observable<number>((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    observableWithOperators
      .pipe(
        map((value) => value * 2),
        map((value) => value + 1)
      )
      .subscribe((value) => console.log(value));

    // Output: 3, 5, 7

    // We can also use the filter() operator to filter the values emitted by the observable.
    // The filter() operator takes a function as an argument.

    const observableWithFilter = new Observable<number>((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    observableWithFilter
      .pipe(filter((value) => value % 2 === 0))
      .subscribe((value) => console.log(value));

    // Output: 2

    //////////////////////////////////////////////////////////////////////////
    // Subject
    // Subject is a special type of observable that allows us to multicast the values.
    // Subject is used to share the values between multiple subscribers.
    // Subject has three methods: next(), error(), and complete().
    // Subject is both an observer and an observable.
    // We can subscribe to the subject using the subscribe() method.
    // We can emit the values using the next() method.
    // We can emit the error using the error() method.
    // We can emit the completion using the complete() method.

    // Creating a subject
    const subject = new Subject<number>();

    // Subscribing to the subject
    subject.subscribe((value) => console.log('======= Subject', value));

    // Operators with subject
    subject
      .pipe(
        map((value) => value * 2),
        map((value) => value + 1)
      )
      .subscribe((value) =>
        console.log('======= Subject with operators', value)
      );

    // Emitting the values
    subject.next(1);

    //////////////////////////////////////////////////////////////////////////
    // BehaviorSubject
    // BehaviorSubject is a special type of subject that has an initial value.
    // BehaviorSubject is used to share the latest value with the subscribers.
    // BehaviorSubject has a value property that contains the latest value.

    // Creating a BehaviorSubject
    const behaviorSubject = new BehaviorSubject<number>(0);

    // Subscribing to the BehaviorSubject
    behaviorSubject.subscribe((value) =>
      console.log('======= BehaviorSubject', value)
    );

    // Emitting the values
    behaviorSubject.next(1);
    behaviorSubject.next(2);

    // Getting the latest value
    console.log('======= Latest Value', behaviorSubject.value);

    //////////////////////////////////////////////////////////////////////////

    // ReplaySubject
    // ReplaySubject is a special type of subject that replays the values to the new subscribers.
    // ReplaySubject has a buffer size that determines the number of values to replay.
    // ReplaySubject is used to share the values with the new subscribers.

    // Creating a ReplaySubject
    const replaySubject = new ReplaySubject<number>(2); // buffer size is 2, It has no initial value

    // Emitting the values
    replaySubject.next(1);
    replaySubject.next(2);
    replaySubject.next(3);
    replaySubject.next(4);
    replaySubject.next(5);

    // Subscribing to the ReplaySubject
    replaySubject.subscribe((value) =>
      console.log('======= ReplaySubject', value)
    );

    // Output: 4, 5 (last two values)

    //////////////////////////////////////////////////////////////////////////
    // Emitting the values after a specific interval
    const timer = new Observable<number>((observer) => {
      setTimeout(() => {
        observer.next(1);
      }, 1000);

      setTimeout(() => {
        observer.next(2);
      }, 2000);

      setTimeout(() => {
        observer.next(3);
        observer.complete();
      }, 3000);
    });

    timer.subscribe((value) =>
      console.log('======= Timer with interval', value)
    );

    //////////////////////////////////////////////////////////////////////////
    // Error handling in observables
    // We can handle the errors in the observable using the catchError() operator.
    // The catchError() operator takes a function as an argument.
    // The function takes the error as an argument.

    const observableWithError = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.error('Error');
      observer.next(3);
      observer.complete();
    });

    observableWithError
      .pipe(
        catchError((error) => {
          console.log('======= Error', error);
          return of('Error Handled');
        })
      )
      .subscribe((value) => console.log(value));

    //////////////////////////////////////////////////////////////////////////

    // combineLatest() operator
    // We can combine the observables using the combineLatest() operator.
    // The combineLatest() operator takes the observables as arguments.
    // The combineLatest() operator emits the values when any of the observables emit a value.

    const observable1 = new Observable<number>((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    const observable2 = new Observable<number>((observer) => {
      observer.next(4);
      observer.next(5);
      observer.next(6);
      observer.complete();
    });

    combineLatest([observable1, observable2])
      .pipe(
        map(([value1, value2]) => {
          console.log('======= combineLatest', value1, value2);
          return value1 + value2;
        })
      )
      .subscribe((value) => console.log('======= combineLatest', value));

    //////////////////////////////////////////////////////////////////////////
    console.log('========================================================');
    // withLatestFrom() operator
    // We can combine the observables using the withLatestFrom() operator.
    // The withLatestFrom() operator takes the observable as an argument.
    // The withLatestFrom() operator emits the values when the source observable emits a value.

    const source = new Subject<number>();
    const latest = new Subject<number>();

    // whenever source emits a value, it will combine with the latest value from latest observable
    source
      .pipe(
        withLatestFrom(latest),
        map(([value1, value2]) => {
          console.log('======= withLatestFrom', value1, value2);
          return value1 + value2;
        })
      )
      .subscribe((value) => console.log('======= withLatestFrom', value));

    source.next(1); // latest value is not available yet so it will not emit
    latest.next(2); // latest value is available now so it will emit, but since subscribe will only execute when source emits a value, it will not emit
    source.next(3); // latest value is available now so it will emit
    latest.next(4);
    source.next(5); // next emit will be here
    source.next(6); // next emit will be here
    source.next(7); // next emit will be here
    source.complete();

    //////////////////////////////////////////////////////////////////////////
    console.log('========================================================');

    // withLatestFrom with multiple observables
    const source1 = new Subject<number>();
    const source2 = new Subject<number>();
    const source3 = new Subject<number>();

    source1
      .pipe(
        withLatestFrom(source2, source3),
        map(([value1, value2, value3]) => {
          console.log(
            '======= withLatestFrom with multiple observables',
            value1,
            value2,
            value3
          );
          return value1 + value2 + value3;
        })
      )
      .subscribe((value) =>
        console.log('======= withLatestFrom with multiple observables', value)
      );

    source1.next(1); // latest value of source2 and source3 is not available yet so it will not emit
    source2.next(2); // latest value of source3 is not available yet so it will not emit
    source3.next(3); // latest value of all 2 dependant observables is available, so when source1 emits a value, it will emit
    source1.next(4); // next emit will be here
    source2.next(5);
    source3.next(6);
    source1.next(7); // next emit will be here
    source1.next(8); // next emit will be here
    source1.next(9); // next emit will be here
    source1.complete();

    //////////////////////////////////////////////////////////////////////////
    console.log('========================================================');

    // switchMap() operator
    // We can switch the observables using the switchMap() operator.
    // The switchMap() operator takes a function as an argument.
    // The function returns an observable.

    // It can be helpful when we want to switch to a new observable when the source observable emits a value.

    const switchMapSource = new Subject<number>();

    switchMapSource
      .pipe(
        switchMap((value) => {
          // switchMap will switch to the new observable
          return of(value * 2); // return an observable
        })
      )
      .subscribe((value) => console.log('======= switchMap', value));

    switchMapSource.next(1);

    // real world example: when we want to cancel the previous request and make a new request when the user types in the search box
    // Example :
    const searchBox = new Subject<string>();

    searchBox
      .pipe(
        switchMap((value) => {
          console.log('======= value', value);
          // cancel the previous request and make a new request
          return this.myService.getPosts();
        })
      )
      .subscribe((value) =>
        console.log('======= switchMap with real world example', value)
      );

    searchBox.next('Angular');
    searchBox.next('React');

    //////////////////////////////////////////////////////////////////////////

    // mergeMap() operator
    // We can merge the observables using the mergeMap() operator.
    // The mergeMap() operator takes a function as an argument.

    // It can be helpful when we want to merge the values emitted by the observables.

    const mergeMapSource = new Subject<number>();

    mergeMapSource
      .pipe(
        mergeMap((value) => {
          // mergeMap will merge the values emitted by the observables
          return of(value * 2); // return an observable
        })
      )
      .subscribe((value) => console.log('======= mergeMap', value));

    mergeMapSource.next(1);

    // real world example: when we want to make multiple requests and merge the results
    // Example :
    const mergeMapSearchBox = new Subject<string>();

    mergeMapSearchBox
      .pipe(
        mergeMap((value) => {
          console.log('======= value', value);
          // make multiple requests and merge the results
          return this.myService.getPosts();
        })
      )
      .subscribe((value) =>
        console.log('======= mergeMap with real world example', value)
      );

    mergeMapSearchBox.next('Angular');
    mergeMapSearchBox.next('React');

    //////////////////////////////////////////////////////////////////////////
  }
}
