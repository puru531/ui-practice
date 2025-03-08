### 1. What is Jest, and why is it used in Angular?

Jest is a JavaScript testing framework that is fast, easy to configure, and works well with Angular. It provides built-in assertion methods, mock functions, and snapshot testing.

#### Why use Jest in Angular?

- Faster execution compared to Karma & Jasmine.
- Built-in parallel test execution.
- Simplified configuration and setup.
- Supports mocking and spies efficiently.

**Example:**

```bash
npm install --save-dev jest @angular-builders/jest @types/jest
```

---

### 2. How do you set up Jest in an Angular project?

To configure Jest in an Angular project:

1. Install necessary dependencies:
   ```bash
   npm install --save-dev jest @angular-builders/jest @types/jest ts-jest
   ```
2. Modify `angular.json`:
   ```json
   "projects": {
     "your-app": {
       "architect": {
         "test": {
           "builder": "@angular-builders/jest:run"
         }
       }
     }
   }
   ```
3. Update `package.json` scripts:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```
4. Run tests:
   ```bash
   npm test
   ```

---

### 3. How do you write a basic Jest test in Angular?

Jest follows a simple structure with `describe`, `test`, and `expect`.

**Example:**

```typescript
import { sum } from "./math";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

---

### 4. How do you test Angular services using Jest?

To test services, use dependency injection and mock dependencies.

**Example:**

```typescript
import { TestBed } from "@angular/core/testing";
import { DataService } from "./data.service";

jest.mock("./data.service");

describe("DataService", () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DataService] });
    service = TestBed.inject(DataService);
  });

  test("should fetch data", () => {
    const mockData = [{ id: 1, name: "Test" }];
    jest.spyOn(service, "getData").mockReturnValue(mockData);
    expect(service.getData()).toEqual(mockData);
  });
});
```

---

### 5. How do you mock dependencies in Jest?

Jest provides built-in mocking using `jest.fn()`.

**Example:**

```typescript
const mockService = {
  fetchData: jest.fn(() => Promise.resolve(["Item1", "Item2"])),
};

test("fetchData should return data", async () => {
  const data = await mockService.fetchData();
  expect(data).toEqual(["Item1", "Item2"]);
});
```

---

### 6. How do you test Angular components using Jest?

Jest with `@angular/core/testing` helps test components.

**Example:**

```typescript
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MyComponent } from "./my.component";

describe("MyComponent", () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
  });

  test("should create", () => {
    expect(component).toBeTruthy();
  });
});
```

---

### 7. How do you test HTTP requests in Angular using Jest?

Use `HttpTestingController` to mock HTTP requests.

**Example:**

```typescript
import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { DataService } from "./data.service";

describe("DataService", () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  test("should fetch data from API", () => {
    const mockData = [{ id: 1, name: "Test" }];
    service.getData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne("https://api.example.com/data");
    req.flush(mockData);
  });
});
```

---

### 8. How do you test event emitters in Angular?

Use `jest.spyOn` to track event emissions.

**Example:**

```typescript
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({ selector: "app-child", template: "" })
export class ChildComponent {
  event = new EventEmitter<string>();
}

describe("ChildComponent", () => {
  test("should emit event", () => {
    const component = new ChildComponent();
    jest.spyOn(component.event, "emit");
    component.event.emit("test event");
    expect(component.event.emit).toHaveBeenCalledWith("test event");
  });
});
```

---

### 9. How do you test Angular directives using Jest?

Jest can test custom directives by checking the DOM behavior.

**Example:**

```typescript
import { Directive, ElementRef, Renderer2 } from "@angular/core";
@Directive({ selector: "[appHighlight]" })
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, "color", "blue");
  }
}

describe("HighlightDirective", () => {
  test("should change text color", () => {
    const mockElement = { nativeElement: document.createElement("div") };
    const mockRenderer = { setStyle: jest.fn() };
    new HighlightDirective(mockElement as any, mockRenderer as any);
    expect(mockRenderer.setStyle).toHaveBeenCalledWith(
      mockElement.nativeElement,
      "color",
      "blue"
    );
  });
});
```

---

### 10. How do you measure code coverage with Jest in Angular?

Run Jest with the coverage flag:

```bash
npm test -- --coverage
```

This generates a `coverage/` folder with reports in various formats like HTML, JSON, and text summaries.

---

### 11. How do you test asynchronous code in Jest?

Use async/await or Promises to handle asynchronous code in Jest.

**Example:**

```typescript
test("async function test", async () => {
  const asyncFunction = () => Promise.resolve("Hello");
  await expect(asyncFunction()).resolves.toBe("Hello");
});
```

---

### 12. How do you use snapshots for testing components?

Jest allows snapshot testing to track UI changes.

**Example:**

```typescript
test("component matches snapshot", () => {
  const tree = renderer.create(<MyComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

---

### 13. How do you mock timers in Jest?

Use Jest's `jest.useFakeTimers()` to mock time-related functions.

**Example:**

```typescript
test("setTimeout test", () => {
  jest.useFakeTimers();
  const callback = jest.fn();
  setTimeout(callback, 1000);
  jest.runAllTimers();
  expect(callback).toHaveBeenCalled();
});
```
