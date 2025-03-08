**Angular Components - Interview Preparation**

# Questions

### **1. Introduction to Angular Components**

Angular components are the building blocks of an Angular application. They control a portion of the UI and consist of three primary elements:

- **Template**: Defines the HTML structure
- **Styles**: CSS for component styling
- **Class (TypeScript)**: Contains business logic

Each component is defined using the `@Component` decorator.

---

### **2. Basic Questions**

1. What is an Angular component?
2. How do you create a component in Angular?
3. What are the main properties of the `@Component` decorator?
4. What is the difference between a component and a module?
5. What are lifecycle hooks in Angular?
6. Explain `ngOnInit` and its use cases.
7. What is the difference between `ngOnChanges` and `ngOnInit`?
8. How do you apply styles to an Angular component?
9. What is View Encapsulation in Angular?
10. Explain how to use template reference variables.

---

### **3. Conceptual & Intermediate Questions**

11. How does Angular handle component communication?
12. What are `@Input` and `@Output` decorators?
13. Explain `ViewChild` and `ContentChild`.
14. What is content projection, and how does `ng-content` work?
15. What are standalone components, and how do they differ from traditional modules?
16. How do you handle component lifecycle events efficiently?
17. What is the role of Change Detection in Angular components?
18. How does Zone.js affect component rendering?
19. Explain how Angular optimizes performance with OnPush change detection.
20. What is the difference between `ng-container`, `ng-template`, and `ng-content`?

---

### **4. Advanced & Tricky Questions**

21. How does Angular differentiate between smart and dumb components?
22. Explain the purpose of `trackBy` in `*ngFor` and how it improves performance.
23. What happens if a component is destroyed but still referenced in memory?
24. How do you optimize large Angular applications with component-level lazy loading?
25. How do you programmatically create and destroy components dynamically?
26. How does Angular handle circular dependencies between components?
27. What is the difference between ViewChild and ContentChild, and when would you use each?
28. Can an Angular component exist without a template? Explain with an example.
29. How do you enforce strict typing in Angular components?
30. How do you implement a dynamic component rendering system?

---

This document provides a structured way to prepare for Angular interviews focused on components. Let me know if you want modifications or more depth in any section before proceeding to the next topic.

<hr />
<hr />

# Answers

## **2. Basic Questions**

### 1. What is an Angular component?

An Angular component is the fundamental building block of an Angular application. It controls a part of the UI and consists of:

- A **TypeScript class** that contains logic and data.
- An **HTML template** that defines the view.
- A **CSS/SCSS file** for styling.
- A **metadata decorator (`@Component`)** that defines how the component behaves.

Each component is a self-contained unit that interacts with other components to form a complete application.

---

### 2. How do you create a component in Angular?

You can create a component in Angular using the Angular CLI:

```sh
ng generate component component-name
```

or

```sh
ng g c component-name
```

Alternatively, you can create a component manually by:

1. Creating a `.ts` file and defining a class with the `@Component` decorator.
2. Adding the component selector, template, and styles.
3. Registering the component in a module (if using module-based structure).

Example:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
  styleUrls: ["./example.component.css"],
})
export class ExampleComponent {
  title = "Angular Component Example";
}
```

---

### 3. What are the main properties of the `@Component` decorator?

The `@Component` decorator provides metadata to define how an Angular component behaves. Key properties include:

- **`selector`** – Defines the component’s HTML tag.
- **`templateUrl` / `template`** – Specifies the HTML template.
- **`styleUrls` / `styles`** – Specifies the component’s styles.
- **`providers`** – Declares dependency injection providers specific to the component.
- **`animations`** – Allows defining animations within the component.
- **`changeDetection`** – Specifies the change detection strategy (`Default` or `OnPush`).
- **`encapsulation`** – Defines how styles are scoped (`Emulated`, `ShadowDom`, or `None`).

Example:

```ts
@Component({
  selector: "app-sample",
  template: "<h1>Hello Angular</h1>",
  styles: ["h1 { color: blue; }"],
})
export class SampleComponent {}
```

---

### 4. What is the difference between a component and a module?

| Feature              | Component                                           | Module                                                       |
| -------------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| Purpose              | Defines a part of the UI and business logic.        | Groups related components, directives, and services.         |
| Decorator            | `@Component`                                        | `@NgModule`                                                  |
| Contains             | Template, styles, logic                             | Components, services, pipes, directives                      |
| Dependency Injection | Can have providers but typically relies on modules. | Configures dependency injection for components and services. |
| Example              | `<app-header></app-header>` (Component)             | `AppModule` importing multiple components                    |

Example:

```ts
// Component
@Component({
  selector: "app-demo",
  template: "<p>Demo Component</p>",
})
export class DemoComponent {}

// Module
@NgModule({
  declarations: [DemoComponent],
  exports: [DemoComponent],
})
export class DemoModule {}
```

---

### 5. What are lifecycle hooks in Angular?

Lifecycle hooks are special methods in a component that get executed at different stages of its existence. They allow developers to execute code at specific moments.

| Hook                    | Purpose                                                       |
| ----------------------- | ------------------------------------------------------------- |
| `ngOnChanges`           | Runs when input properties change.                            |
| `ngOnInit`              | Executes after the component is initialized.                  |
| `ngDoCheck`             | Detects and responds to changes not covered by `ngOnChanges`. |
| `ngAfterContentInit`    | Executes when projected content is inserted.                  |
| `ngAfterContentChecked` | Runs after every content check.                               |
| `ngAfterViewInit`       | Executes when the component’s view is initialized.            |
| `ngAfterViewChecked`    | Runs after every view check.                                  |
| `ngOnDestroy`           | Cleans up before the component is destroyed.                  |

Example:

```ts
export class DemoComponent implements OnInit, OnDestroy {
  ngOnInit() {
    console.log("Component initialized");
  }

  ngOnDestroy() {
    console.log("Component destroyed");
  }
}
```

### 6. Explain `ngOnInit` and its use cases.

`ngOnInit` is a lifecycle hook that is called once after Angular initializes the component.

#### Use Cases:

- Fetching initial data from a service.
- Setting up subscriptions.
- Executing logic that depends on input properties.
- Initializing component variables.

Example:

```ts
export class ExampleComponent implements OnInit {
  ngOnInit() {
    console.log("Component Initialized");
  }
}
```

---

### 7. What is the difference between `ngOnChanges` and `ngOnInit`?

| Feature          | `ngOnChanges`                                            | `ngOnInit`                           |
| ---------------- | -------------------------------------------------------- | ------------------------------------ |
| When it runs     | When input properties change.                            | Once after component initialization. |
| Parameters       | `SimpleChanges` object with previous and current values. | No parameters.                       |
| Common Use Cases | Reacting to input property changes.                      | Initializing data, making API calls. |

Example:

```ts
export class ExampleComponent implements OnChanges, OnInit {
  @Input() value: string;

  ngOnChanges(changes: SimpleChanges) {
    console.log("Input changed:", changes);
  }

  ngOnInit() {
    console.log("Component Initialized");
  }
}
```

---

### 8. How do you apply styles to an Angular component?

Angular components support styling using:

- **Inline styles** in the `styles` property.
- **External stylesheets** using `styleUrls`.
- **Global styles** in `styles.css` or `styles.scss`.

Example:

```ts
@Component({
  selector: "app-styled",
  template: "<p>Styled Component</p>",
  styles: ["p { color: red; }"],
})
export class StyledComponent {}
```

---

### 9. What is View Encapsulation in Angular?

View encapsulation controls how component styles are scoped.

| Mode                 | Description                                |
| -------------------- | ------------------------------------------ |
| `Emulated` (default) | Styles are scoped using unique attributes. |
| `ShadowDom`          | Uses native Shadow DOM.                    |
| `None`               | Styles apply globally.                     |

Example:

```ts
@Component({
  selector: "app-example",
  encapsulation: ViewEncapsulation.None,
  styles: ["p { color: red; }"],
})
export class ExampleComponent {}
```

---

### 10. Explain how to use template reference variables.

Template reference variables (`#varName`) allow access to DOM elements or component instances.

Example:

```html
<input #inputField type="text" />
<button (click)="logInput(inputField.value)">Log Value</button>
```

```ts
logInput(value: string) {
  console.log(value);
}
```

## **3. Conceptual & Intermediate Questions**

### 11. How does Angular handle component communication?

Angular provides multiple ways for components to communicate:

- **@Input()**: Pass data from parent to child.
- **@Output()**: Emit events from child to parent.
- **ViewChild & ContentChild**: Access child components and projected content.
- **Services with Dependency Injection**: Share data across components.
- **BehaviorSubject & Observables**: Reactive data sharing between unrelated components.
- **Local Storage or State Management (e.g., NgRx)**: Maintain global application state.

Example using `@Input` and `@Output`:

```ts
@Component({
  selector: "app-child",
  template: "<p>Message from Parent: {{ message }}</p>",
})
export class ChildComponent {
  @Input() message: string;
  @Output() notify = new EventEmitter<string>();

  sendMessage() {
    this.notify.emit("Hello Parent!");
  }
}
```

```ts
@Component({
  selector: "app-parent",
  template: `
    <app-child
      [message]="parentMessage"
      (notify)="receiveMessage($event)"
    ></app-child>
  `,
})
export class ParentComponent {
  parentMessage = "Hello Child!";
  receiveMessage(event: string) {
    console.log(event);
  }
}
```

---

### 12. What are `@Input` and `@Output` decorators?

- **`@Input`** allows a parent component to pass data to a child component.
- **`@Output`** allows a child component to send data/events to the parent component.

Example:

```ts
@Component({ selector: "app-child", template: "<p>{{ data }}</p>" })
export class ChildComponent {
  @Input() data: string;
  @Output() event = new EventEmitter<string>();
}
```

```html
<app-child [data]="parentData" (event)="handleEvent($event)"></app-child>
```

---

### 13. Explain `ViewChild` and `ContentChild`.

- **`ViewChild`**: Used to access elements or child components inside a component’s view.
- **`ContentChild`**: Used to access projected content (passed using `<ng-content>`).

Example of `ViewChild`:

```ts
@Component({ selector: "app-child", template: "<p>Child Component</p>" })
export class ChildComponent {
  sayHello() {
    console.log("Hello from Child");
  }
}
```

```ts
@Component({
  selector: "app-parent",
  template: "<app-child #child></app-child>",
})
export class ParentComponent {
  @ViewChild("child") childComponent: ChildComponent;
  ngAfterViewInit() {
    this.childComponent.sayHello();
  }
}
```

Example of `ContentChild`:

```ts
@Component({ selector: "app-child", template: "<ng-content></ng-content>" })
export class ChildComponent {}
```

```html
<app-child>
  <p #contentChild>Projected Content</p>
</app-child>
```

---

### 14. What is content projection, and how does `ng-content` work?

Content projection allows a parent component to insert custom content into a child component’s template using `<ng-content>`.

Example:

```ts
@Component({
  selector: "app-card",
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
```

Usage:

```html
<app-card>
  <p>This content is projected inside the card.</p>
</app-card>
```

For multiple projection slots:

```ts
@Component({
  selector: "app-layout",
  template: `
    <header><ng-content select="[header]"></ng-content></header>
    <main><ng-content></ng-content></main>
    <footer><ng-content select="[footer]"></ng-content></footer>
  `,
})
export class LayoutComponent {}
```

Usage:

```html
<app-layout>
  <div header>Header Content</div>
  <p>Main Content</p>
  <div footer>Footer Content</div>
</app-layout>
```

---

### 15. What are standalone components, and how do they differ from traditional modules?

Standalone components in Angular allow the creation of components without the need for `NgModule`. They streamline development and reduce boilerplate.

#\*Differences between Standalone Components and Traditional Modules\*\*

| Feature     | Standalone Components              | Traditional Modules                              |
| ----------- | ---------------------------------- | ------------------------------------------------ |
| Declaration | `standalone: true` in `@Component` | Declared inside `@NgModule`                      |
| Imports     | Directly imports dependencies      | Imports dependencies via `imports` in `NgModule` |
| Modularity  | Self-contained                     | Requires module structure                        |

Example of a standalone component:

```ts
@Component({
  selector: "app-standalone",
  standalone: true,
  template: "<p>Standalone Component</p>",
  imports: [CommonModule],
})
export class StandaloneComponent {}
```

Usage:

```ts
bootstrapApplication(StandaloneComponent, {
  providers: [provideRouter(routes)],
});
```

---

### 16. How do you handle component lifecycle events efficiently?

Efficient handling of lifecycle events ensures optimal performance and prevents memory leaks. Key strategies include:

- **Use `ngOnInit` for initialization**: Fetch data, set up subscriptions.
- **Avoid heavy logic in `ngOnChanges`**: Only use it when reacting to input property changes.
- **Unsubscribe in `ngOnDestroy`**: Prevent memory leaks by unsubscribing from Observables.
- **Use `ngAfterViewInit` for DOM manipulations**: Ensures child components are available.
- **Leverage `ngDoCheck` cautiously**: Only when detecting custom changes.

Example:

```ts
export class ExampleComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = someObservable.subscribe((data) => console.log(data));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

---

### 17. What is the role of Change Detection in Angular components?

Change Detection ensures that the UI updates whenever the application state changes. It follows these steps:

- Detects changes in component properties.
- Compares previous and current values.
- Renders updated data in the UI.

Angular uses two strategies:

1. **Default**: Checks all components.
2. **OnPush**: Only checks components when input properties change.

Example using `OnPush`:

```ts
@Component({
  selector: "app-optimized",
  template: "<p>{{ data }}</p>",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimizedComponent {
  @Input() data: string;
}
```

---

### 18. How does Zone.js affect component rendering?

Zone.js is a library that intercepts asynchronous operations (e.g., `setTimeout`, HTTP calls) and triggers Angular’s change detection.

- Automatically detects async changes.
- Ensures UI updates without manual intervention.
- Can be optimized using `runOutsideAngular` to prevent unnecessary detection cycles.

Example:

```ts
constructor(private ngZone: NgZone) {}

heavyProcess() {
  this.ngZone.runOutsideAngular(() => {
    setTimeout(() => console.log('Executed outside Angular'), 1000);
  });
}
```

---

### 19. Explain how Angular optimizes performance with OnPush change detection.

`OnPush` tells Angular to check a component only when its `@Input` properties change, reducing unnecessary change detection cycles.

#### Benefits:

- Improves performance by reducing checks.
- Prevents unnecessary re-renders.
- Works well with immutable data structures and RxJS Observables.

Example:

```ts
@Component({
  selector: "app-performance",
  template: "<p>{{ user.name }}</p>",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceComponent {
  @Input() user: { name: string };
}
```

To trigger detection manually:

```ts
this.cdRef.markForCheck();
```

---

### 20. What is the difference between `ng-container`, `ng-template`, and `ng-content`?

| Feature          | `ng-container`                                 | `ng-template`              | `ng-content`                          |
| ---------------- | ---------------------------------------------- | -------------------------- | ------------------------------------- |
| Purpose          | Group elements without adding extra DOM nodes. | Define reusable templates. | Project content from parent to child. |
| Rendered in DOM? | No                                             | No (until explicitly used) | Yes                                   |
| Use Case         | Structural directives without wrappers.        | Reusable templates.        | Content projection.                   |

#### Examples:

**`ng-container` (No extra element)**:

```html
<ng-container *ngIf="isVisible">
  <p>Visible content</p>
</ng-container>
```

**`ng-template` (Reusable templates)**:

```html
<ng-template #tpl>
  <p>Template Content</p>
</ng-template>
<button (click)="viewContainer.createEmbeddedView(tpl)">Load Template</button>
```

**`ng-content` (Content Projection)**:

```ts
@Component({ selector: "app-wrapper", template: "<ng-content></ng-content>" })
export class WrapperComponent {}
```

Usage:

```html
<app-wrapper>
  <p>Projected Content</p>
</app-wrapper>
```

---

## **4. Advanced & Tricky Questions**

### 21. How does Angular differentiate between smart and dumb components?

Angular follows a design pattern where components are categorized as **Smart** (Container) and **Dumb** (Presentational) components to maintain better separation of concerns.

| Feature         | Smart Components                                     | Dumb Components                            |
| --------------- | ---------------------------------------------------- | ------------------------------------------ |
| Purpose         | Handles business logic, API calls, state management. | Focuses on UI and displays data.           |
| Data Management | Manages data and passes it down.                     | Receives data via `@Input`.                |
| Communication   | Uses services and state management tools.            | Emits events using `@Output`.              |
| Example Usage   | Parent component handling API data.                  | Child component displaying formatted data. |

Example:

```ts
@Component({
  selector: "app-smart",
  template:
    '<app-dumb [data]="info" (action)="handleAction($event)"></app-dumb>',
})
export class SmartComponent {
  info = { name: "Angular" };
  handleAction(event: any) {
    console.log("Action received:", event);
  }
}

@Component({
  selector: "app-dumb",
  template: '<p>{{ data.name }}</p> <button (click)="onClick()">Click</button>',
})
export class DumbComponent {
  @Input() data: any;
  @Output() action = new EventEmitter<void>();
  onClick() {
    this.action.emit();
  }
}
```

---

### 22. Explain the purpose of `trackBy` in `*ngFor` and how it improves performance.

When rendering lists using `*ngFor`, Angular re-renders the entire list whenever an item changes. Using `trackBy` helps optimize this by identifying each item uniquely.

#### Benefits of `trackBy`:

- Reduces unnecessary DOM updates.
- Enhances performance for large lists.
- Prevents re-creation of elements unless necessary.

Example:

```html
<div *ngFor="let item of items; trackBy: trackById">{{ item.name }}</div>
```

```ts
trackById(index: number, item: any) {
  return item.id; // Unique identifier
}
```

Without `trackBy`, Angular removes and re-adds elements, causing inefficient updates.

---

### 23. What happens if a component is destroyed but still referenced in memory?

If a component is destroyed but still referenced:

- It remains in memory, causing a **memory leak**.
- Any ongoing subscriptions or event listeners **continue executing**, leading to unexpected behavior.

#### Preventing Memory Leaks:

- **Unsubscribe from Observables**:

```ts
export class ExampleComponent implements OnDestroy {
  private subscription: Subscription;
  ngOnInit() {
    this.subscription = someObservable.subscribe();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

- **Remove Event Listeners**:

```ts
document.removeEventListener("click", this.someFunction);
```

- **Use the `async` pipe** in templates to auto-unsubscribe.

---

### 24. How do you optimize large Angular applications with component-level lazy loading?

Lazy loading components means loading them only when needed, reducing the initial bundle size and improving performance.

#### Steps for Component-Level Lazy Loading:

1. **Use `NgComponentOutlet`** for dynamic loading.
2. **Leverage Angular’s built-in lazy module loading.**

Example:

```ts
export class LazyLoaderComponent {
  async loadComponent() {
    const { LazyComponent } = await import("./lazy.component");
    this.viewContainerRef.createComponent(LazyComponent);
  }
}
```

This ensures that components are loaded only when required, reducing initial load time.

---

### 25. How do you programmatically create and destroy components dynamically?

You can dynamically create and destroy components using Angular’s `ViewContainerRef` and `ComponentFactoryResolver`.

#### Steps:

1. **Inject `ViewContainerRef`** to hold dynamic components.
2. **Use `createComponent` to instantiate the component.**
3. **Destroy components when they are no longer needed.**

Example:

```ts
export class DynamicComponentLoader {
  constructor(private viewContainerRef: ViewContainerRef) {}

  loadComponent() {
    const componentRef =
      this.viewContainerRef.createComponent(ExampleComponent);
    setTimeout(() => componentRef.destroy(), 5000); // Destroy after 5s
  }
}
```

---

### 26. How does Angular handle circular dependencies between components?

Circular dependencies occur when two or more components depend on each other directly or indirectly, causing compilation or runtime issues.

#### Solutions to Avoid Circular Dependencies:

1. **Use Dependency Injection:** Inject dependencies instead of importing directly.
2. **Refactor to Services:** Move shared logic into services and inject them.
3. **Lazy Loading Modules:** Split dependencies into feature modules.
4. **Use `forwardRef()`**:

   ```ts
   import { forwardRef, Inject } from "@angular/core";

   @Component({ selector: "app-a", template: "" })
   export class ComponentA {
     constructor(
       @Inject(forwardRef(() => ComponentB)) private compB: ComponentB
     ) {}
   }

   @Component({ selector: "app-b", template: "" })
   export class ComponentB {
     constructor(private compA: ComponentA) {}
   }
   ```

---

### 27. What is the difference between ViewChild and ContentChild, and when would you use each?

| Feature     | `ViewChild`                                                                           | `ContentChild`                                                     |
| ----------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Purpose     | Access child elements in the component's own template.                                | Access projected content inside `<ng-content>`.                    |
| When to Use | When working with DOM elements, child components, or directives in the same template. | When working with projected content provided by another component. |
| Example     | `@ViewChild(ChildComponent) child: ChildComponent;`                                   | `@ContentChild(ChildComponent) child: ChildComponent;`             |

Example of `ViewChild`:

```ts
@ViewChild('inputRef') inputElement!: ElementRef;
ngAfterViewInit() { console.log(this.inputElement.nativeElement.value); }
```

Example of `ContentChild`:

```ts
@ContentChild(ChildComponent) child!: ChildComponent;
ngAfterContentInit() { console.log(this.child); }
```

---

### 28. Can an Angular component exist without a template? Explain with an example.

Yes, an Angular component can exist without a template when it serves as a logic-only component.

Example:

```ts
@Component({
  selector: "app-logic",
  template: "", // No template
})
export class LogicComponent {
  logMessage() {
    console.log("This component has no UI");
  }
}
```

Such components are rare but useful for managing logic within a tree of components.

---

### 29. How do you enforce strict typing in Angular components?

To enforce strict typing:

1. Enable `strict` mode in `tsconfig.json`:
   ```json
   "compilerOptions": {
     "strict": true,
     "strictNullChecks": true,
     "strictPropertyInitialization": true
   }
   ```
2. Use TypeScript features:
   ```ts
   @Input() user!: { name: string; age: number };
   @Output() notify: EventEmitter<string> = new EventEmitter<string>();
   ```
3. Avoid `any` type; use explicit types and generics.

---

### 30. How do you implement a dynamic component rendering system?

To render components dynamically:

1. **Use `ViewContainerRef` to create components dynamically.**
2. **Destroy and recreate components as needed.**

Example:

```ts
export class DynamicLoader {
  constructor(private vcr: ViewContainerRef) {}

  loadComponent(component: Type<any>) {
    this.vcr.clear();
    this.vcr.createComponent(component);
  }
}
```

This allows rendering different components dynamically based on user actions or data conditions.
