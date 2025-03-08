**Angular Services & Dependency Injection - Interview Preparation**

# Questions

### **1. Introduction to Services and Dependency Injection**

In Angular, **services** are used to share data and logic across components, while **dependency injection (DI)** is a design pattern that allows classes to be injected into components, directives, and other services.

- Services help keep the code modular and reusable.
- Angular's DI system ensures efficient management of dependencies.
- Services are provided at different levels (`root`, `module`, `component`).

---

### **2. Basic Questions**

1. What is a service in Angular?
2. How do you create a service in Angular?
3. What is Dependency Injection (DI) in Angular?
4. What is the purpose of the `@Injectable()` decorator?
5. What are the different ways to provide a service in Angular?
6. What does `{ providedIn: 'root' }` mean?
7. What is the difference between `providedIn: 'root'` and module-based providers?
8. How do you inject a service into a component?
9. Can services be injected into other services?
10. What is the significance of hierarchical injectors in Angular?

---

### **3. Conceptual & Intermediate Questions**

11. What is a singleton service in Angular, and how is it implemented?
12. How does Angular’s hierarchical dependency injection work?
13. What is the difference between `useClass`, `useExisting`, `useValue`, and `useFactory` in Angular DI?
14. What is the role of the `Injector` class in Angular?
15. How do you create a service that depends on another service?
16. What is the difference between a service and a factory in Angular?
17. How do you provide a service at the component level, and when should you use it?
18. What is the `inject()` function in Angular, and how is it different from constructor injection?
19. What are the advantages of using services in Angular applications?
20. Can a service be lazy-loaded in Angular? If yes, how?

---

### **4. Advanced & Tricky Questions**

21. How do you handle circular dependencies in Angular services?
22. How does Angular resolve dependencies when multiple providers exist?
23. What happens if a service is provided in multiple modules?
24. How do you mock a service in Angular unit testing?
25. How do you handle service cleanup and prevent memory leaks?
26. Can an Angular service manage component state? If yes, how?
27. What is an InjectionToken, and when should you use it?
28. How does Angular handle multi-providers in dependency injection?
29. How do you provide different service implementations based on conditions?
30. Explain a real-world scenario where dependency injection improves code maintainability.

---

# Answer

## **2. Basic Questions**

### 1. What is a service in Angular?

A service in Angular is a class that provides reusable logic that can be shared across multiple components. Services are primarily used for data fetching, business logic, and state management. They help in keeping components lean by offloading complex operations.

---

### 2. How do you create a service in Angular?

You can create a service using the Angular CLI:

```sh
ng generate service my-service
```

This generates a service file (`my-service.service.ts`) with a class decorated by `@Injectable()`.

Example:

```ts
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class MyService {
  constructor() {}
  getData() {
    return "Hello from MyService";
  }
}
```

---

### 3. What is Dependency Injection (DI) in Angular?

Dependency Injection (DI) is a design pattern used in Angular to pass dependencies (like services) to components or other services. Instead of creating dependencies manually, Angular injects them where needed, improving modularity and testability.

Example of DI:

```ts
constructor(private myService: MyService) {}
```

Here, `MyService` is injected into a component.

---

### 4. What is the purpose of the `@Injectable()` decorator?

The `@Injectable()` decorator marks a class as a service that can be injected using Angular's DI system. It tells Angular how the service should be provided and ensures that the service instance is available when requested.

Example:

```ts
@Injectable({ providedIn: "root" })
export class MyService {}
```

---

### 5. What are the different ways to provide a service in Angular?

1. **In `providedIn` metadata (recommended)**

   ```ts
   @Injectable({ providedIn: "root" })
   export class MyService {}
   ```

   This makes the service available throughout the application as a singleton.

2. **In a feature module**

   ```ts
   @NgModule({
     providers: [MyService],
   })
   export class MyModule {}
   ```

   This limits the service to the module scope.

3. **In a component or directive**
   ```ts
   @Component({
     selector: "app-example",
     providers: [MyService],
   })
   export class ExampleComponent {}
   ```
   This creates a new instance of the service for the component and its children.

---

### 6. What does `{ providedIn: 'root' }` mean?

- `{ providedIn: 'root' }` is a way to provide a service at the root level of an Angular application.
- It ensures a single instance of the service is available application-wide.
- This approach enables **tree-shakable** services, meaning Angular will remove unused services during build optimization.

Example:

```ts
@Injectable({ providedIn: "root" })
export class MyService {
  constructor() {}
}
```

---

### 7. What is the difference between `providedIn: 'root'` and module-based providers?

| Feature                  | `providedIn: 'root'` | Module-Based Providers     |
| ------------------------ | -------------------- | -------------------------- |
| Scope                    | Application-wide     | Limited to specific module |
| Singleton                | Yes                  | Depends on module imports  |
| Tree-Shakable            | Yes                  | No                         |
| Explicit Import Required | No                   | Yes                        |

Example of module-based provider:

```ts
@NgModule({
  providers: [MyService],
})
export class MyModule {}
```

---

### 8. How do you inject a service into a component?

- Services are injected into a component using **Dependency Injection (DI)** via the constructor.
- The service must be provided either in `root`, a module, or a component.

Example:

```ts
@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
})
export class ExampleComponent {
  constructor(private myService: MyService) {}
}
```

---

### 9. Can services be injected into other services?

- Yes, services can be injected into other services, a concept known as **service chaining**.
- This is useful for **modularization and separation of concerns**.

Example:

```ts
@Injectable({ providedIn: "root" })
export class LoggerService {
  log(message: string) {
    console.log(message);
  }
}

@Injectable({ providedIn: "root" })
export class DataService {
  constructor(private logger: LoggerService) {}
  fetchData() {
    this.logger.log("Fetching data...");
  }
}
```

---

### 10. What is the significance of hierarchical injectors in Angular?

- **Hierarchical injectors** allow different parts of an application to have separate instances of services.
- If a service is **provided at a specific component level**, it creates a new instance for that component and its children.
- If provided at `root`, a single instance is shared across the entire app.

Example:

```ts
@Component({
  selector: "app-parent",
  providers: [MyService],
})
export class ParentComponent {}
```

Here, `MyService` will have a **separate instance** in `ParentComponent` and its children, different from the root-level instance.

---

## **3. Conceptual & Intermediate Questions**

### 11. What is a singleton service in Angular, and how is it implemented?

A singleton service in Angular is a service that has only one instance throughout the application lifecycle. It is typically implemented using the `{ providedIn: 'root' }` metadata in the `@Injectable()` decorator or by providing it in a module.

Example:

```ts
@Injectable({ providedIn: "root" })
export class SingletonService {
  constructor() {}
}
```

This ensures that the service is instantiated only once and shared across the application.

---

### 12. How does Angular’s hierarchical dependency injection work?

Angular's DI system follows a hierarchical structure where injectors exist at different levels:

- **Root Injector**: Provides services globally across the app.
- **Module-Level Injector**: Services provided within an `NgModule` are scoped to that module.
- **Component-Level Injector**: Services provided in a component's `providers` array are limited to that component and its children.

Example:

```ts
@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
  providers: [ExampleService], // Scoped to this component and its children
})
export class ExampleComponent {}
```

---

### 13. What is the difference between `useClass`, `useExisting`, `useValue`, and `useFactory` in Angular DI?

Angular provides multiple ways to configure providers:

- **`useClass`**: Provides a new instance of the specified class.
  ```ts
  { provide: LoggerService, useClass: ConsoleLoggerService }
  ```
- **`useExisting`**: Uses an existing instance of another service.
  ```ts
  { provide: LoggerService, useExisting: ExistingLoggerService }
  ```
- **`useValue`**: Provides a static value.
  ```ts
  { provide: API_URL, useValue: 'https://api.example.com' }
  ```
- **`useFactory`**: Provides a dynamically created instance based on a factory function.
  ```ts
  { provide: LoggerService, useFactory: () => new CustomLoggerService() }
  ```

---

### 14. What is the role of the `Injector` class in Angular?

The `Injector` class in Angular is responsible for retrieving instances of dependencies. It allows manual dependency resolution without relying on constructor injection.

Example:

```ts
constructor(private injector: Injector) {}
ngOnInit() {
  const myService = this.injector.get(MyService);
}
```

This can be useful in dynamically created components or advanced scenarios where constructor-based DI is not feasible.

---

### 15. How do you create a service that depends on another service?

To create a service that depends on another service, you inject it via the constructor.

Example:

```ts
@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}
}
```

In this example, `ApiService` depends on `HttpClient`, and Angular will automatically inject the required instance when needed.

---

### 16. What is the difference between a service and a factory in Angular?

- **Service**: A class with methods that perform specific tasks, provided via Dependency Injection.
- **Factory**: A function that returns an object and is used for more flexible dependency creation.
- **Key Difference**: Services are class-based and can leverage DI directly, while factories allow more customization.

Example of a Service:

```ts
@Injectable({ providedIn: "root" })
export class MyService {
  getData() {
    return "Hello from Service";
  }
}
```

Example of a Factory:

```ts
export function myFactory() {
  return new MyService();
}

@NgModule({
  providers: [{ provide: MyService, useFactory: myFactory }]
})
```

---

### 17. How do you provide a service at the component level, and when should you use it?

- **Providing a service at the component level** creates a new instance of the service for that component and its children.
- **Use Case**: When you need component-specific state management.

Example:

```ts
@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
  providers: [MyService],
})
export class ExampleComponent {
  constructor(private myService: MyService) {}
}
```

**Pros:**

- Isolated state per component instance.
- Prevents shared state issues.

**Cons:**

- Increased memory usage due to multiple instances.

---

### 18. What is the `inject()` function in Angular, and how is it different from constructor injection?

- **`inject()`**: A function introduced in Angular 14 that allows dependency injection without requiring constructor parameters.
- **Difference**:
  - Constructor injection requires parameters in the constructor.
  - `inject()` can be used in functions, factories, and outside class constructors.

Example:

```ts
import { inject } from "@angular/core";

export class ExampleService {
  private logger = inject(LoggerService);
  logMessage() {
    this.logger.log("Message logged");
  }
}
```

**Use Case:** Useful in standalone functions and DI in factory functions.

---

### 19. What are the advantages of using services in Angular applications?

- **Code Reusability**: Services allow shared logic across components.
- **Separation of Concerns**: Business logic is kept separate from UI logic.
- **Single Source of Truth**: Centralized data management.
- **Dependency Injection**: Services can be injected into any part of the application, improving modularity.
- **Improved Performance**: Avoids redundant API calls by caching data in services.

---

### 20. Can a service be lazy-loaded in Angular? If yes, how?

Yes, a service can be lazy-loaded using Angular’s `providedIn` option or explicitly within lazy-loaded modules.

**Approach 1: Using `{ providedIn: 'root' }`**

```ts
@Injectable({ providedIn: "root" })
export class LazyService {
  constructor() {
    console.log("LazyService Loaded");
  }
}
```

**Approach 2: Providing Service in Lazy-Loaded Module**

```ts
@NgModule({
  providers: [LazyService],
})
export class LazyModule {}
```

**Approach 3: Using Injection Token & Dynamic Import**

```ts
{ provide: LazyService, useFactory: () => import('./lazy.service').then(m => m.LazyService) }
```

Lazy-loaded services improve performance by loading dependencies only when required.

---

## **4. Advanced & Tricky Questions**

### 21. How do you handle circular dependencies in Angular services?

- Circular dependencies occur when two or more services depend on each other.
- Solutions:
  - **Use Forward References**: Use `Injector` to manually inject dependencies.
  - **Refactor Dependencies**: Extract shared logic into a separate service.
  - **Use Lazy Injection**: Inject dependencies only when needed inside a method.

Example:

```ts
@Injectable({ providedIn: "root" })
export class ServiceA {
  constructor(private injector: Injector) {}
  get serviceB() {
    return this.injector.get(ServiceB);
  }
}
```

---

### 22. How does Angular resolve dependencies when multiple providers exist?

- Angular follows a **hierarchical dependency injection** model.
- If a service is provided at different levels, Angular resolves the closest instance.
- Providers can be defined at different levels:
  - **Root level (`providedIn: 'root'`)** – Singleton across the app.
  - **Module level (`providers` array in a module)** – Unique instance per module.
  - **Component level (`providers` array in a component)** – Unique instance per component instance.

---

### 23. What happens if a service is provided in multiple modules?

- If a service is provided in multiple feature modules, each module gets its own instance.
- If a service is provided in `AppModule`, it is a singleton.
- If using `{ providedIn: 'root' }`, Angular ensures a single instance across the app.
- **Avoid redundant service declarations** to prevent unintended behavior.

---

### 24. How do you mock a service in Angular unit testing?

- Mocking services in unit tests ensures that tests are independent of external dependencies.
- **Use Jasmine Spies:**

```ts
const mockService = jasmine.createSpyObj("MyService", ["getData"]);
mockService.getData.and.returnValue(of(mockData));
```

- **Use TestBed with a Mock Provider:**

```ts
TestBed.configureTestingModule({
  providers: [{ provide: MyService, useValue: mockService }],
});
```

- **Use Angular's `HttpTestingController` for HTTP services.**

---

### 25. How do you handle service cleanup and prevent memory leaks?

- **Unsubscribe from Observables**:
  - Use `takeUntil` pattern or async pipes.
  - Example:
  ```ts
  private destroy$ = new Subject<void>();
  this.service.getData().pipe(takeUntil(this.destroy$)).subscribe();
  ```
- **Use `ngOnDestroy` in Services**:
  ```ts
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ```
- **Use Angular’s `async` pipe**: It automatically unsubscribes when the component is destroyed.

---

### 26. Can an Angular service manage component state? If yes, how?

Yes, an Angular service can manage component state by acting as a centralized state management system. This approach is beneficial because services are singleton instances, ensuring that the state persists across different components.

**Implementation Steps:**

1. Create a service with a state variable.
2. Use RxJS `BehaviorSubject` to store and update state.
3. Inject the service into components that need access to the state.
4. Subscribe to state changes in components.

**Example:**

```ts
@Injectable({ providedIn: "root" })
export class StateService {
  private counterSubject = new BehaviorSubject<number>(0);
  counter$ = this.counterSubject.asObservable();

  updateCounter(value: number) {
    this.counterSubject.next(value);
  }
}
```

---

### 27. What is an InjectionToken, and when should you use it?

An `InjectionToken` is a unique key used to define and inject dependencies that do not have a class representation, such as configurations, constants, or interfaces.

**When to use it?**

- When injecting non-class dependencies like environment variables.
- When providing multiple implementations of an interface.
- When avoiding direct class coupling in dependency injection.

**Example:**

```ts
export const API_URL = new InjectionToken<string>('apiUrl');

@NgModule({
  providers: [{ provide: API_URL, useValue: 'https://api.example.com' }]
})
export class AppModule {}

@Component({...})
export class MyComponent {
  constructor(@Inject(API_URL) private apiUrl: string) {}
}
```

---

### 28. How does Angular handle multi-providers in dependency injection?

Angular allows multiple providers for a single token using the `multi: true` option. This is useful when collecting multiple implementations under one provider token.

**Example:**

```ts
export const LOGGER_TOKEN = new InjectionToken<string[]>('Logger Token');

@NgModule({
  providers: [
    { provide: LOGGER_TOKEN, useValue: 'ConsoleLogger', multi: true },
    { provide: LOGGER_TOKEN, useValue: 'FileLogger', multi: true }
  ]
})
export class AppModule {}

@Component({...})
export class MyComponent {
  constructor(@Inject(LOGGER_TOKEN) private loggers: string[]) {
    console.log(this.loggers); // ['ConsoleLogger', 'FileLogger']
  }
}
```

---

### 29. How do you provide different service implementations based on conditions?

You can provide different implementations of a service using factory functions or conditional logic in providers.

**Example using a Factory Provider:**

```ts
export class DevLoggerService {
  log(message: string) {
    console.log("DEV:", message);
  }
}

export class ProdLoggerService {
  log(message: string) {
    /* Send logs to server */
  }
}

export const LOGGER_SERVICE = new InjectionToken<Logger>("LoggerService");

export function loggerFactory(): Logger {
  return environment.production
    ? new ProdLoggerService()
    : new DevLoggerService();
}

@NgModule({
  providers: [{ provide: LOGGER_SERVICE, useFactory: loggerFactory }],
})
export class AppModule {}
```

---

### 30. Explain a real-world scenario where dependency injection improves code maintainability.

**Scenario: Logging Service for Different Environments**
Imagine you need a logging mechanism that logs to the console in development but sends logs to an external server in production. Instead of modifying the logging logic throughout your app, you can use dependency injection to switch implementations dynamically.

**Benefits:**

- Decouples components from specific implementations.
- Enables easier unit testing by mocking dependencies.
- Supports multiple implementations seamlessly.
- Reduces tight coupling, making refactoring easier.

By using dependency injection, you can configure logging behavior in one place without modifying components, making the application more maintainable and scalable.
