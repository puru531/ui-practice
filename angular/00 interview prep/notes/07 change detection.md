# Change Detection in Angular

Angular's change detection mechanism is responsible for keeping the view in sync with the model. It ensures that any changes in the application's state are reflected in the user interface.

Angular wraps our component tree with so called Zone, a feature provided by `zone.js` library. Zone is a mechanism that allows Angular to track changes in the application state and update the view accordingly. When a change occurs, Angular runs a change detection cycle to check for changes in the component's data and update the view if necessary.

## How Change Detection Works

Angular uses a change detection mechanism to track changes in the application state and update the view accordingly. The change detection process involves the following steps:

1. **Component Initialization**: When a component is initialized, Angular creates a change detector for the component and its children.
2. **Change Detection Cycle**: Angular runs a change detection cycle to check for changes in the component's data. This cycle is triggered by various events, such as user interactions, HTTP requests, and timers.
3. **Dirty Checking**: During the change detection cycle, Angular performs dirty checking to compare the current state of the component with the previous state. If any changes are detected, Angular updates the view.
4. **View Update**: If changes are detected, Angular updates the DOM to reflect the new state of the component.

## Writing efficient template bindings

- Should NOT put expensive calculations into the template. Example, a getter that does a lot of work.
- Should NOT put functions that return different values each time they are called. Event bindings and Signals are exceptions.

- **Aoiding Zone pollution** : Consider telling Angular if a certain event doesn't matter for change detection.

  Opt-out of change detection for a certain event that are not related to the application state and UI. This can be done using `NgZone` service.

```typescript
export class MyComponent {
  private zone = inject(NgZone);

  someFunction() {
    this.zone.runOutsideAngular(() => {
      // code that doesn't trigger change detection
    });
  }
}
```

## Change Detection Strategies

Angular provides two change detection strategies:

1. **Default**: In the default strategy, Angular checks the entire component tree for changes. This strategy is suitable for most applications but can be inefficient for large applications with many components.
2. **OnPush**: In the OnPush strategy, Angular only checks the component and its children for changes if the component's inputs have changed or if an event has occurred within the component. This strategy can improve performance by reducing the number of checks performed during the change detection cycle.

To use the OnPush strategy, set the `changeDetection` property of the component's decorator to `ChangeDetectionStrategy.OnPush`:

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-my-component",
  templateUrl: "./my-component.component.html",
  styleUrls: ["./my-component.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent {
  // ...existing code...
}
```

## Example

Consider the following example to illustrate change detection in Angular:

1. **Component with Default Change Detection**:

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-default-change-detection",
  template: `
    <p>{{ counter }}</p>
    <button (click)="increment()">Increment</button>
  `,
})
export class DefaultChangeDetectionComponent {
  counter = 0;

  increment() {
    this.counter++;
  }
}
```

2. **Component with OnPush Change Detection**:
    
    It tells Angular that change detection should only be triggered if the component's inputs have changed or if an event has occurred within the component or sub-component. And Signals.

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-on-push-change-detection",
  template: `
    <p>{{ counter }}</p>
    <button (click)="increment()">Increment</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushChangeDetectionComponent {
  counter = 0;

  increment() {
    this.counter++;
  }
}
```

In the default change detection strategy, Angular checks the entire component tree for changes, while in the OnPush strategy, Angular only checks the component and its children if the component's inputs have changed or if an event has occurred within the component.

Understanding Angular's change detection mechanism is crucial for optimizing the performance of your Angular applications and ensuring that the view is always in sync with the model.

# Triggering chnage detection manually

- Angular provides a way to trigger change detection manually using the `ChangeDetectorRef` service.

```typescript
import { Component, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-my-component",
  template: `
    <p>{{ counter }}</p>
    <button (click)="increment()">Increment</button>
  `,
})
export class MyComponent {
  counter = 0;

  constructor(private cdRef: ChangeDetectorRef) {}

  increment() {
    this.counter++;
    this.cdRef.detectChanges(); // Manually trigger change detection
  }
}
```

# `async` pipe

- The `async` pipe is a built-in Angular pipe that automatically subscribes to an `Observable` or `Promise` and returns the latest value emitted by the `Observable` or the resolved value of the `Promise`.

- The `async` pipe is commonly used in Angular templates to handle asynchronous data streams and update the view when new data is available.


Example:

```typescript
import { Component } from "@angular/core";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-my-component",
  template: `
    <p>{{ data$ | async }}</p>
  `,
  impots: [AsyncPipe]
})
export class MyComponent {
  data$ = of("Hello, World!");
}
```