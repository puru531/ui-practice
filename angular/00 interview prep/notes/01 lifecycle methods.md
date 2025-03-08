# Angular Lifecycle Methods
Sequence of lifecycle methods in Angular:
1. constructor
   - Called when the component is instantiated.
2. ngOnChanges
   - Called when an input property changes.
   - An object of type `SimpleChanges` is passed as an argument.
   - This object contains the previous and current values of the input properties and a property `isFirstChange` to check if the change is the first change.
3. ngOnInit
   - Called once after the first ngOnChanges.
4. ngDoCheck
   - Called during every change detection run.
5. ngAfterContentInit
   - Runs once after the component's `content` (ng-content) has been initialized.
6. ngAfterContentChecked
   - Runs every time the content has been checked for changes.
7. ngAfterViewInit
   - Runds once after the component's `view` has been initialized.
8. ngAfterViewChecked
   - Runs every time the component's `view` has been checked for changes.
9. ngOnDestroy
   - Runs once before the component is destroyed.

## Hooks that run when input properties change:
1. ngOnChanges
2. ngDoCheck
3. ngAfterContentChecked
4. ngAfterViewChecked

## DestroyRef
- When a component is destroyed, destroyRef emits onDestroy() event.
- This can be used as alternative to ngOnDestroy() lifecycle hook.

NOTE : This only works in Angular 16 and above.

```typescript
export class MyComponent implements OnInit {
  private destroyRef = inject(DestroyRef); // Inject DestroyRef service.
  interval: any;

  constructor() {}

  ngOnInit() {
    const interval = setInterval(() => {
      console.log('Interval');
    }, 1000);

    this.destroyRef.onDestroy(() => { // onDestroy() is called when the component is destroyed.
      clearInterval(interval);
    });
  }
}
```

## afterRender and afterNextRender

**afterRender** runs again and again when anything changes in the website (NOT only component).

**afterNextRender** afterNextRender is used for one-time initialisation, such as for third-party libraries or APIs that only work on the browser side, for example charts, or for browser-only APIs.

and **afterNextRender** are utility functions that can be used to run a callback after the component has been rendered or after the next render cycle.

```typescript

constructor() {
  afterRender(() => {
    console.log('After Render');
  });

  afterNextRender(() => {
    console.log('After Next Render');
  });
}

```


# Listening to changes of signals
By default Angular does not provide a way to listen to changes of signals in ts file, although it does in html file. However, we can achieve it using effect function.

```typescript
currentStatus = signal('initial');
constructor() {
  effect(() => {
    console.log(this.currentStatus());
  });
}
```