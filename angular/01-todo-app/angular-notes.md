# Angular 18 Notes

# Signals

# Data Interpolation

# Data Binding

# Directives

In Angular, directives are classes that add additional behavior to elements in your Angular applications. They can be used to manipulate the DOM, change the appearance or behavior of elements, and create reusable components. There are three types of directives in Angular:

1. **Component Directives**: These are the most common directives and are used to create components. They have a template, styles, and logic.

2. **Structural Directives**: These directives change the DOM layout by adding or removing elements. Examples include `*ngIf`, `*ngFor`, and `*ngSwitch`.

3. **Attribute Directives**: These directives change the appearance or behavior of an element, component, or another directive. Examples include `ngClass`, `ngStyle`, and custom attribute directives.

# For Loops

```angular181html
<ul>
  @for(let item of items) {
    <li>{{item}}</li>
  }
</ul>
```

# Conditional Statements

## if

```angular181html
@if(condition) {
  <div>Content</div>
}
```

## if with else

```angular181html
@if(condition) {
  <div>Content</div>
} @else {
  <div>Content</div>
}
```

# Dependency Injection

Dependency Injection (DI) in Angular is a design pattern and mechanism where:

1. Instead of creating service instances manually inside components
   BAD APPROACH:

```ts
private tasksService = new TasksService();
```

2. We declare dependencies in the constructor and Angular provides instances
   GOOD APPROACH:

```ts
constructor(private tasksService: TasksService) {}
```

3. Services can be injected using constructor injection

```ts
@Injectable({
  providedIn: "root", // Makes service available app-wide
})
export class TasksService {
  // Service implementation
}
```

4. Or using the inject() function (Alternative approach)

```ts
import { inject } from "@angular/core";

export class TaskComponent {
  private tasksService = inject(TasksService);
}
```

Benefits of DI:

- Promotes loose coupling between components and dependencies
- Makes code more testable through dependency mocking
- Enables sharing singleton instances across components
- Angular handles object creation and lifecycle management
- Allows for easier dependency replacement and configuration
  Component file :

```typescript
  // private tasksService = new TasksService();

  // this will create a new instance of the service
  // which is not what we want
  // we want to use the same instance of the service
  // that is provided by Angular

  constructor(private tasksService: TasksService) {}

  // this process is known as Dependency Injection.
  // You tell Angular which type of value you need and Angular created it and provides it as an argument


  onAddTask(task: Newtask) {
    this.tasksService.addTask(task, this.userId);
    this.isAddingTask = false;
  }
```

Service File :

```typescript
// Services in Angular are classes that can be shared across components
// They are used for:
// 1. Sharing data between components
// 2. Implementing application logic
// 3. Making HTTP calls
// Here's an example of a basic service:

import { Newtask } from "./task/task.model";

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root", // This makes the service available throughout the app
})
export class TasksService {
  // A service is generally a class.

  addTask(taskData: Newtask, userId: string) {
    this.tasks.push({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
  }
}
```

### Other way of injecting service in component:

```typescript
// Another way to inject a service is using the 'inject' function
import { inject } from "@angular/core";

export class TaskComponent {
  private tasksService = inject(TasksService);

  onAddTask(task: Newtask) {
    this.tasksService.addTask(task, this.userId);
    this.isAddingTask = false;
  }
}
```
