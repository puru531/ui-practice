# Services

Services allow us to share logic and data across the application. They are used to encapsulate the logic that is not directly related to the view. Services are used to fetch data from the server, perform calculations, and share data between components. Services can be singletons, meaning that they are instantiated only once and shared across the application.

```typescript
import { Injectable } from "@angular/core";

@Injectable({
  // Injectable tells Angular that this class can be injected into other classes (components, services, directives, etc.)
  providedIn: "root", // providedIn tells Angular that this service should be provided at the root level, meaning that it will be available throughout the application
})
export class DataService {
  data: string[] = ["Angular", "React", "Vue"];
  constructor() {}
}
```

To use a service in a component, you need to inject it into the component's constructor. Angular will automatically create an instance of the service and provide it to the component.

**Ways of injecting service in the component**:

1. By creating regular instance of the service class:

```typescript
private dataService = new DataService(); // This is not recommended as it creates a new instance of the service class in every component that uses it. And data will not be shared across components.

ngOnInit() {
  this.data = this.dataService.data;
}
```

2. Using Angular's dependency injection system:

   You don't create service instances yourself - instead, you request them from Angular's dependency injection system. Angular will create an instance of the service and provide it to the component.

```typescript
import { Component, OnInit } from "@angular/core";

import { DataService } from "./data.service";

@Component({
  selector: "my-app",
  template: `
    <h1>Services Example</h1>
    <ul>
      <li *ngFor="let item of data">{{ item }}</li>
    </ul>
  `,
})
export class MyAppComponent implements OnInit {
  data: string[];

  // specify the service as a dependency in the constructor parameter, if private or public keyword is used, Angular will automatically create a property with the same name and assign the service instance to it.
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.data = this.dataService.data;
  }
}
```

3. Using built-in `inject` function:

```typescript
private dataService = inject(DataService);
```

Angular uses multiple injectors which it mananges where you can register your services:

1. Platform EnvironmentInjector
2. Application root EnvironmentInjector
3. ModuleInjector
4. ElementInjector

Our component goes through these injectors to check if the depedency can be fetched from there.

If we don't provide @Injectable() decorator, we get NullInjectorError. This is because Angular doesn't know how to create an instance of the service. It seaches for it in ElementInjector, ModuleInjector, Application root EnvironmentInjector and Platform EnvironmentInjector but doesn't find it. and hence lastly throws NullInjectorError.

## Multiple ways of providing a service

### 1. Registering a service with the root injector:

```typescript
/*
This registers an injectable service with the Application root EnvironmentInjector. Therefore, ALL components, directives, services, etc. can request the instance of this service.
*/
@Injectable({
  providedIn: "root",
})
export class DataService {}
```

### 2. Registering in `main.ts`

`main.ts`

```typescript
/*
This registers the service with the Application root EnvironmentInjector. Therefore, ALL components, directives, services, etc. can request the instance of this service.
*/

/* NOTE
 Difference from @Injectable({ providedIn: 'root' }) is that this approch does not the Tree Shakable providers feature of Angular. Tree Shakable providers feature allows Angular to remove the service from the bundle if it is not used. This feature is only available when using providedIn: 'root' in the @Injectable() decorator.
 */

bootstrapApplication(AppComponent, {
  providers: [DataService],
}).catch((err) => console.error(err));
```

### 3. Through ElementInjector

Injector that is closely tied to the DOM elements or components and DIrectives. We cannot them in other services.

service:

```typescript
//no injectable decorator
export class DataService {
  data: string[] = ["Angular", "React", "Vue"];
  constructor() {}
}
```

component:

```typescript
@Component({
  selector: "app-root",
  template: ` <app-child></app-child> `,
  providers: [DataService], // This registers the service with the ElementInjector of the component. Therefore, only the component and its children can request the instance of this service. Parent or sibling components cannot request the instance of this service.
})
export class AppComponent {
  constructor(private dataService: DataService) {}
}
```

## Injecting service into service

```typescript
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoggerService {
  log(message: string) {
    console.log(message);
  }
}
```

```typescript
import { Injectable, inject } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class DataService {
  data: string[] = ["Angular", "React", "Vue"];

  private logger = inject(LoggerService);
  // ----- OR ---------
  // constructor(private logger: LoggerService) { }

  getData() {
    this.logger.log("Fetching data...");
    return this.data;
  }
}
```

## Using custom DI tokens & Providers

when we use `providers` array to inject service in `bootstrapApplication`, by default angular creates a token for the service class.

`main.ts`

```typescript
bootstrapApplication(AppComponent, {
  providers: [DataService],
}).catch((err) => console.error(err));
```

We can also create our own token and use it to inject the service.

`main.ts`

```typescript
export const DataServiceToken = new InjectionToken<DataService>(
  "data-service-token"
);

bootstrapApplication(AppComponent, {
  providers: [{ provide: DataServiceToken, useClass: DataService }], // custom injection token
}).catch((err) => console.error(err));
```

Using in component:

```ts
@Component({
  selector: "app-root",
  template: ` <app-child></app-child> `,
})
export class AppComponent {
  private dataService = inject(DataServiceToken);

  // OR

  constructor(@Inject(DataServiceToken) private dataService: DataService) {}
}
```

<br />
<br />
<br />
<br />
<br />
<br />

# Injecting Non-Class values

`task.model.ts`

```typescript
type TaskStatusOptions = {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: string;
  text: string;
}[];
//injection token
export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>("task-status-options");

//value
export const TaskStatusOptions: TaskStatusOptions = [
  {
    value: "open",
    taskStatus: "OPEN",
    text: "Open",
  },
  {
    value: "in-progress",
    taskStatus: "IN_PROGRESS",
    text: "In Progress",
  },
  {
    value: "done",
    taskStatus: "DONE",
    text: "Completed",
  },
];

export const TaskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions,
};
```
## Injecting in Component
`task-list.component.ts`

```typescript
@Component({
  selector: "app-task-list",
  template: `
    <h1>Task List</h1>
    <ul>
      <li *ngFor="let task of tasks">{{ task.text }}</li>
    </ul>
  `,
  providers: [TaskStatusOptionsProvider],
})

export class TaskListComponent {
  taskstatusOptions = inject(TASK_STATUS_OPTIONS);
}
```