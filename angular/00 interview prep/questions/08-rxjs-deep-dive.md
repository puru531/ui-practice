# RxJS Deep Dive Interview Questions

## 1. What is RxJS and why do we use it?
RxJS is a library for reactive programming using Observables that makes it easier to:
- Compose asynchronous code
- Handle multiple data streams
- Transform data
- Handle errors
- Manage subscriptions

## 2. Explain the difference between Observable types
```typescript
// Cold Observable - Data is created inside
const cold$ = new Observable(observer => {
  observer.next(Math.random());
});

// Hot Observable - Data is created outside
const subject = new Subject();
const hot$ = subject.asObservable();
```

## 3. What are the different types of Subjects?
```typescript
// Subject - No initial value or replay
const subject = new Subject<number>();

// BehaviorSubject - Requires initial value
const behaviorSubject = new BehaviorSubject<number>(0);

// ReplaySubject - Replays n number of values
const replaySubject = new ReplaySubject<number>(2);

// AsyncSubject - Only emits last value on completion
const asyncSubject = new AsyncSubject<number>();
```

## 4. How do Higher Order Mapping Operators work?
```typescript
// switchMap - Cancels previous inner observable
search$.pipe(
  switchMap(term => this.service.search(term))
);

// mergeMap - Concurrent execution
userIds$.pipe(
  mergeMap(id => this.service.getUser(id))
);

// concatMap - Sequential execution
saves$.pipe(
  concatMap(data => this.service.save(data))
);

// exhaustMap - Ignores new values while inner is active
clicks$.pipe(
  exhaustMap(() => this.service.getData())
);
```

## 5. What are Creation Operators?
```typescript
// of - Creates observable from arguments
const data$ = of(1, 2, 3);

// from - Creates observable from array/promise
const array$ = from([1, 2, 3]);

// interval - Emits incremental numbers periodically
const interval$ = interval(1000);

// timer - Emits after delay
const timer$ = timer(1000);
```

## 6. How do you handle errors in RxJS?
```typescript
observable$.pipe(
  catchError(error => {
    console.error('Error:', error);
    return of([]); // Fallback value
  }),
  retry(3), // Retry 3 times
  timeout(5000) // Timeout after 5 seconds
);
```

## 7. What are Transformation Operators?
```typescript
// map - Transform each value
observable$.pipe(
  map(x => x * 2)
);

// scan - Accumulate values
observable$.pipe(
  scan((acc, curr) => acc + curr, 0)
);

// reduce - Like scan but only emits final value
observable$.pipe(
  reduce((acc, curr) => acc + curr, 0)
);
```

## 8. How do you combine Observables?
```typescript
// combineLatest - Combines latest values
combineLatest([obs1$, obs2$]).pipe(
  map(([value1, value2]) => ({ value1, value2 }))
);

// merge - Merges multiple observables
merge(obs1$, obs2$);

// concat - Concatenates observables sequentially
concat(obs1$, obs2$);

// zip - Combines corresponding values
zip(obs1$, obs2$);
```

## 9. What are Filtering Operators?
```typescript
// filter - Filter values based on condition
observable$.pipe(
  filter(x => x > 0)
);

// distinctUntilChanged - Only emit when value changes
observable$.pipe(
  distinctUntilChanged()
);

// take - Take n values
observable$.pipe(
  take(5)
);

// takeUntil - Take until notifier emits
observable$.pipe(
  takeUntil(notifier$)
);
```

## 10. How do you handle multicasting?
```typescript
// Using Subject
const subject = new Subject();
obs$.subscribe(subject);
subject.subscribe(observer1);
subject.subscribe(observer2);

// Using share operator
const shared$ = obs$.pipe(
  share()
);
```

## 11. What are Time-based Operators?
```typescript
// debounceTime - Wait for pause in emissions
input$.pipe(
  debounceTime(300)
);

// throttleTime - Emit value then ignore for duration
clicks$.pipe(
  throttleTime(1000)
);

// delay - Delay each emission
observable$.pipe(
  delay(1000)
);
```

## 12. How do you implement custom operators?
```typescript
function multiplyBy(multiplier: number) {
  return pipe(
    map(value => value * multiplier)
  );
}

// Usage
observable$.pipe(
  multiplyBy(2)
);
```

## 13. What is the difference between share() and shareReplay()?
```typescript
// share() - Multicast to new subscribers
const shared$ = source$.pipe(
  share()
);

// shareReplay() - Multicast with replay
const replayed$ = source$.pipe(
  shareReplay(1)
);
```

## 14. How do you handle completion and cleanup?
```typescript
// Using finalize
observable$.pipe(
  finalize(() => console.log('Completed or errored'))
);

// Cleanup in components
export class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    observable$.pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## 15. What are Conditional Operators?
```typescript
// defaultIfEmpty - Emit default value if empty
observable$.pipe(
  defaultIfEmpty('No Data')
);

// every - Check if all values pass predicate
observable$.pipe(
  every(x => x > 0)
);

// iif - Choose observable based on condition
iif(
  () => condition,
  of('True'),
  of('False')
);
```

## 16. Tricky: How do you handle race conditions?
```typescript
// Using switchMap
search$.pipe(
  debounceTime(300),
  switchMap(term => this.service.search(term))
);

// Using exhaustMap for logins
login$.pipe(
  exhaustMap(creds => this.auth.login(creds))
);
```

## 17. How do you test RxJS code?
```typescript
import { TestScheduler } from 'rxjs/testing';

describe('RxJS Testing', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should transform values', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('a-b-c|', { a: 1, b: 2, c: 3 });
      const result$ = source$.pipe(map(x => x * 2));
      expectObservable(result$).toBe('a-b-c|', { a: 2, b: 4, c: 6 });
    });
  });
});
```

## 18. What are the best practices for error handling?
```typescript
// Comprehensive error handling
observable$.pipe(
  catchError(error => {
    if (error instanceof NetworkError) {
      return this.handleNetworkError(error);
    }
    if (error instanceof ValidationError) {
      return this.handleValidationError(error);
    }
    return throwError(() => error);
  }),
  retry({
    count: 3,
    delay: retryCount => timer(retryCount * 1000)
  }),
  timeout(5000)
);
```

## 19. How do you handle backpressure?
```typescript
// Using windowTime
observable$.pipe(
  windowTime(1000),
  map(win => win.pipe(reduce((acc, curr) => acc + curr, 0))),
  concatAll()
);

// Using bufferCount
observable$.pipe(
  bufferCount(10),
  map(buffer => processBuffer(buffer))
);
```

## 20. What are advanced patterns with RxJS?
```typescript
// Caching with shareReplay
const cached$ = observable$.pipe(
  shareReplay(1)
);

// Retry with exponential backoff
const retryStrategy = {
  count: 3,
  delay: (error, retryCount) =>
    timer(Math.pow(2, retryCount) * 1000)
};

// Polling
const polling$ = timer(0, 5000).pipe(
  switchMap(() => this.getData()),
  retry()
);

// Cancel pending requests
const search$ = new Subject();
const results$ = search$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.search(term))
);
```