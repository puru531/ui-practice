**Angular Directives & Component Projection - Interview Preparation**

# Questions

### **1. Introduction to Directives**

Directives in Angular are used to modify the behavior or appearance of elements in the DOM. There are three types of directives:

- **Component Directives**: Custom UI elements with templates.
- **Structural Directives**: Modify the structure of the DOM (e.g., `*ngIf`, `*ngFor`).
- **Attribute Directives**: Change the appearance or behavior of an element (e.g., `ngClass`, `ngStyle`).

### **2. Introduction to Component Projection**

Component projection (Content Projection) allows inserting external content into a component using the `<ng-content>` directive. It helps in creating reusable components with dynamic content.

---

### **3. Basic Questions**

#### **Directives**

1. What are directives in Angular?
2. What are the three types of directives in Angular?
3. How do you create a custom directive in Angular?
4. What is the difference between structural and attribute directives?
5. How does the `*ngIf` directive work?
6. How does the `*ngFor` directive work?
7. What is the purpose of `ngClass` and `ngStyle`?
8. How do structural directives manipulate the DOM?
9. How does Angular recognize a directive (i.e., `@Directive` decorator)?
10. What is the purpose of the `Renderer2` service in custom directives?

#### **Component Projection**

11. What is content projection in Angular?
12. How does the `<ng-content>` directive work?
13. What is the difference between `ng-container` and `ng-content`?
14. Can you project multiple pieces of content into a single component?
15. What is the `select` attribute in content projection, and how is it used?

---

### **4. Conceptual & Intermediate Questions**

#### **Directives**

16. How can you pass data to a directive using `@Input()`?
17. How do you listen to DOM events in a directive?
18. What is the `HostListener` decorator, and how does it work?
19. What is the `HostBinding` decorator, and how does it work?
20. What is the difference between using `ElementRef` and `Renderer2` in directives?

#### **Component Projection**

21. What is the advantage of using `ng-content` over passing inputs?
22. How do you handle dynamic projections in Angular?
23. What happens if multiple `<ng-content>` elements exist in a component?
24. How can content projection be combined with `@ViewChild()` and `@ContentChild()`?
25. How do you test a component that uses content projection?

---

### **5. Advanced & Tricky Questions**

#### **Directives**

26. What are dynamic directives, and how do you create them at runtime?
27. How do directives interact with Angular’s change detection mechanism?
28. How do you optimize directive performance in large applications?
29. How can you create a directive that modifies sibling elements?
30. How do you conditionally apply multiple directives to a single element?

#### **Component Projection**

31. Can content projection be used inside Angular's standalone components?
32. How can you implement nested content projection in Angular?
33. How does Angular handle `ng-content` updates when projected content changes dynamically?
34. What are the limitations of content projection in Angular?
35. How do you debug issues with `ng-content` rendering?

---

# Answer

## **3. Basic Questions**

### **Directives**

### 1. What are directives in Angular?

Directives are special markers in Angular that extend HTML by adding custom behavior to elements and components. They help modify the structure, appearance, or behavior of DOM elements dynamically.

---

### 2. What are the three types of directives in Angular?

1. **Component Directives**: Technically a directive with a template, used to define UI components.
2. **Structural Directives**: Modify the DOM structure by adding or removing elements (e.g., `*ngIf`, `*ngFor`).
3. **Attribute Directives**: Modify the appearance or behavior of elements without altering the DOM structure (e.g., `ngClass`, `ngStyle`).

---

### 3. How do you create a custom directive in Angular?

You can create a custom directive using the `@Directive` decorator:

```ts
import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, "backgroundColor", "yellow");
  }
}
```

Usage:

```html
<p appHighlight>Highlighted text</p>
```

---

### 4. What is the difference between structural and attribute directives?

| Feature | Structural Directives          | Attribute Directives                              |
| ------- | ------------------------------ | ------------------------------------------------- |
| Purpose | Modify the DOM structure       | Modify element behavior/style                     |
| Syntax  | `*` prefix (e.g., `*ngIf`)     | Standard attribute binding                        |
| Example | `*ngFor`, `*ngIf`, `*ngSwitch` | `ngClass`, `ngStyle`, custom attribute directives |

---

### 5. How does the `*ngIf` directive work?

The `*ngIf` directive conditionally adds or removes an element from the DOM based on a boolean expression.

Example:

```html
<p *ngIf="isVisible">This text is visible when isVisible is true.</p>
```

Equivalent Angular rendering:

```ts
if (isVisible) {
  // Element is added to DOM
} else {
  // Element is removed from DOM
}
```

Unlike CSS-based hiding (e.g., `display: none`), `*ngIf` actually removes the element from the DOM, improving performance.

---

### 6. How does the `*ngFor` directive work?

The `*ngFor` directive is a structural directive in Angular that iterates over a list and creates multiple instances of an element. It dynamically generates DOM elements based on the data array.

**Example:**

```html
<ul>
  <li *ngFor="let item of items; let i = index">{{ i + 1 }} - {{ item }}</li>
</ul>
```

**Key Features:**

- `let i = index`: Captures the current index.
- Supports trackBy to optimize re-rendering.

---

### 7. What is the purpose of `ngClass` and `ngStyle`?

Both `ngClass` and `ngStyle` are attribute directives used for dynamic styling.

- **`ngClass`**: Dynamically applies CSS classes based on conditions.

  ```html
  <div [ngClass]="{ 'active': isActive, 'disabled': isDisabled }">
    Styled Div
  </div>
  ```

- **`ngStyle`**: Dynamically applies inline styles.

  ```html
  <div [ngStyle]="{ 'color': textColor, 'font-size': fontSize + 'px' }">
    Styled Div
  </div>
  ```

---

### 8. How do structural directives manipulate the DOM?

Structural directives (e.g., `*ngIf`, `*ngFor`, `*ngSwitch`) add or remove elements from the DOM dynamically.

- **`*ngIf`** removes or adds elements based on a condition.
- **`*ngFor`** creates multiple elements dynamically based on an iterable.
- **`*ngSwitch`** conditionally renders one of several elements.

Angular transforms the `*` syntax into `<ng-template>`, where it programmatically manages DOM updates.

---

### 9. How does Angular recognize a directive (i.e., `@Directive` decorator)?

Angular recognizes directives by the `@Directive` decorator. It marks a class as a directive and allows the use of dependency injection and lifecycle hooks.

**Example:**

```typescript
import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = "yellow";
  }
}
```

Usage:

```html
<p appHighlight>Highlighted Text</p>
```

---

### 10. What is the purpose of the `Renderer2` service in custom directives?

`Renderer2` is an Angular service that abstracts direct DOM manipulation for better performance and security.

**Why use `Renderer2`?**

- Works across different rendering environments (e.g., server-side rendering).
- Prevents direct DOM access, which is useful for web security (XSS protection).

**Example:**

```typescript
import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, "backgroundColor", "yellow");
  }
}
```

This ensures safer and optimized DOM manipulations without directly accessing `nativeElement`.

### **Component Projection**

### 11. What is content projection in Angular?

Content projection is a technique in Angular that allows developers to pass content from a parent component into a child component. It enables dynamic rendering of content inside a reusable component while maintaining separation of concerns.

---

### 12. How does the `<ng-content>` directive work?

The `<ng-content>` directive acts as a placeholder inside a child component where projected content from a parent component will be inserted. When Angular renders the child component, it replaces the `<ng-content>` tag with the content provided by the parent.

Example:

```html
<!-- Parent Component -->
<app-card>
  <p>This is projected content!</p>
</app-card>
```

```html
<!-- Child Component (app-card) -->
<div class="card">
  <ng-content></ng-content>
</div>
```

---

### 13. What is the difference between `ng-container` and `ng-content`?

- **`ng-container`**: A logical grouping element that does not render in the DOM. It is used for grouping structural directives like `*ngIf` or `*ngFor`.
- **`ng-content`**: A content projection placeholder that renders the projected content from the parent component.

Example:

```html
<ng-container *ngIf="showContent">
  <p>Visible only when showContent is true.</p>
</ng-container>
```

---

### 14. Can you project multiple pieces of content into a single component?

Yes, Angular supports multi-slot content projection using the `select` attribute in `<ng-content>`. This allows different parts of the parent content to be projected into different sections of the child component.

Example:

```html
<!-- Parent Component -->
<app-card>
  <h1 title>Header Content</h1>
  <p body>Main Content</p>
</app-card>
```

```html
<!-- Child Component (app-card) -->
<div class="card">
  <ng-content select="[title]"></ng-content>
  <ng-content select="[body]"></ng-content>
</div>
```

---

### 15. What is the `select` attribute in content projection, and how is it used?

The `select` attribute is used in `ng-content` to specify which part of the parent content should be projected into a particular `<ng-content>` slot. It allows for targeted content placement inside a reusable component.

Example:

```html
<!-- Child Component -->
<ng-content select="h1"></ng-content>
<!-- Projects <h1> elements -->
<ng-content select="p"></ng-content>
<!-- Projects <p> elements -->
```

```html
<!-- Parent Component -->
<app-card>
  <h1>Header</h1>
  <p>Body content</p>
</app-card>
```

This setup ensures that `<h1>` tags are projected into the first `<ng-content>` and `<p>` tags into the second.

---

These features make content projection a powerful way to build flexible and reusable Angular components.

---

## **4. Conceptual & Intermediate Questions**

### **Directives**

### 16. How can you pass data to a directive using `@Input()`?

You can pass data to a directive using the `@Input()` decorator, similar to how you pass data to a component. This allows you to customize the directive's behavior dynamically.

Example:

```ts
import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight = "yellow";

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }
}
```

Usage in template:

```html
<p appHighlight="lightblue">This text will have a light blue background</p>
```

---

### 17. How do you listen to DOM events in a directive?

You can listen to DOM events inside a directive using `@HostListener`. This allows you to react to user interactions like clicks, key presses, or mouse movements.

Example:

```ts
import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appClickTracker]",
})
export class ClickTrackerDirective {
  @HostListener("click", ["$event"])
  handleClick(event: Event) {
    console.log("Element clicked:", event);
  }
}
```

Usage in template:

```html
<button appClickTracker>Click Me</button>
```

---

### 18. What is the `HostListener` decorator, and how does it work?

The `@HostListener` decorator in Angular allows you to listen to events on the host element of a directive or component and execute a method when that event occurs.

Example:

```ts
import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appHoverEffect]",
})
export class HoverEffectDirective {
  @HostListener("mouseenter") onMouseEnter() {
    console.log("Mouse entered");
  }

  @HostListener("mouseleave") onMouseLeave() {
    console.log("Mouse left");
  }
}
```

Usage in template:

```html
<p appHoverEffect>Hover over this text</p>
```

---

### 19. What is the `HostBinding` decorator, and how does it work?

The `@HostBinding` decorator allows you to bind a property of the host element to a directive property, enabling dynamic style and class changes.

Example:

```ts
import { Directive, HostBinding, Input } from "@angular/core";

@Directive({
  selector: "[appBorderHighlight]",
})
export class BorderHighlightDirective {
  @Input() highlightColor = "red";

  @HostBinding("style.border") get border() {
    return `2px solid ${this.highlightColor}`;
  }
}
```

Usage in template:

```html
<div appBorderHighlight highlightColor="blue">
  This div will have a blue border
</div>
```

---

### 20. What is the difference between using `ElementRef` and `Renderer2` in directives?

| Feature                         | `ElementRef`                          | `Renderer2`                        |
| ------------------------------- | ------------------------------------- | ---------------------------------- |
| Direct DOM Access               | Yes                                   | No                                 |
| Security                        | Less secure (direct DOM manipulation) | More secure (avoids direct access) |
| Angular Universal (SSR) Support | No                                    | Yes                                |
| Recommended Usage               | Avoid unless necessary                | Preferred for modifying elements   |

Example using `ElementRef` (Not recommended due to direct DOM access):

```ts
import { Directive, ElementRef } from "@angular/core";

@Directive({ selector: "[appTextRed]" })
export class TextRedDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.color = "red";
  }
}
```

Example using `Renderer2` (Recommended approach):

```ts
import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({ selector: "[appTextGreen]" })
export class TextGreenDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, "color", "green");
  }
}
```

Using `Renderer2` ensures better security and compatibility with Angular’s rendering mechanisms.

### **Component Projection**

### 21. What is the advantage of using `ng-content` over passing inputs?

- `ng-content` allows **dynamic content projection**, enabling the consumer of the component to pass any markup.
- It keeps the component **more flexible and reusable** compared to using `@Input()` for content.
- It avoids **managing multiple inputs** in the child component and instead delegates content handling to the parent.
- It supports **styling and encapsulation**, allowing projected content to inherit styles from the parent.

---

### 22. How do you handle dynamic projections in Angular?

- Use multiple `<ng-content>` elements with the `select` attribute to project different sections dynamically.
- Use `ngTemplateOutlet` to swap dynamic templates within the component.
- Utilize `@ContentChild()` or `@ContentChildren()` to interact with projected content dynamically.

Example using `ngTemplateOutlet`:

```html
<ng-container *ngTemplateOutlet="dynamicTemplate"></ng-container>
```

---

### 23. What happens if multiple `<ng-content>` elements exist in a component?

- Angular projects content into the **first matching** `<ng-content>` element.
- If multiple `<ng-content>` elements exist, you must use the `select` attribute to control projection.
- Without `select`, all projected content goes into the first `<ng-content>`, and others remain empty.

Example:

```html
<ng-content select=".header"></ng-content>
<ng-content select=".body"></ng-content>
```

---

### 24. How can content projection be combined with `@ViewChild()` and `@ContentChild()`?

- `@ViewChild()` is used to access elements **inside the component's template**.
- `@ContentChild()` is used to access **projected content** inside the component.
- Combining both allows you to manage both internal and projected elements.

Example:

```ts
@ContentChild('projectedContent', { static: true }) content!: ElementRef;
```

---

### 25. How do you test a component that uses content projection?

- Use **TestBed** in Angular testing to create a test host component.
- Project content using the host component and query it.
- Use `fixture.detectChanges()` to apply changes and verify the behavior.

Example:

```ts
const fixture = TestBed.createComponent(TestHostComponent);
fixture.detectChanges();
const projectedText =
  fixture.nativeElement.querySelector("child-comp").textContent;
expect(projectedText).toContain("Projected Content");
```

Testing ensures projected content renders correctly and interacts as expected.

---

## **5. Advanced & Tricky Questions**

### **Directives**

### 26. What are dynamic directives, and how do you create them at runtime?

Dynamic directives are directives that are added to elements at runtime rather than being statically defined in the template. You can create and attach directives dynamically using `ViewContainerRef` and `ComponentFactoryResolver` (Angular 12 and earlier) or `ViewContainerRef.createComponent()` (Angular 13+).

Example:

```ts
@Directive({ selector: "[appDynamicDirective]" })
export class DynamicDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = "yellow";
  }
}
```

To add dynamically:

```ts
@ViewChild(ViewContainerRef, { static: true }) container!: ViewContainerRef;

addDirective() {
  this.container.createComponent(DynamicDirective);
}
```

---

### 27. How do directives interact with Angular’s change detection mechanism?

Directives interact with Angular’s change detection in the following ways:

- By default, they trigger change detection whenever their `@Input()` properties change.
- Structural directives (`*ngIf`, `*ngFor`) modify the DOM, which influences change detection.
- Change detection can be optimized using `ChangeDetectionStrategy.OnPush` when directives are used in components.
- You can manually trigger change detection inside a directive using `ChangeDetectorRef.detectChanges()`.

Example:

```ts
constructor(private cd: ChangeDetectorRef) {}

someMethod() {
  this.cd.detectChanges(); // Manually trigger change detection
}
```

---

### 28. How do you optimize directive performance in large applications?

- **Use `ChangeDetectionStrategy.OnPush`**: Reduces unnecessary re-renders.
- **Minimize DOM Manipulation**: Avoid frequent direct DOM updates.
- **Use `trackBy` with `*ngFor`**: Prevents unnecessary DOM re-rendering.
- **Detach Change Detection When Needed**: Use `ChangeDetectorRef.detach()` for heavy operations.
- **Optimize Event Handling**: Use `RxJS` operators like `throttleTime` or `debounceTime` to reduce frequent event triggers.

Example:

```ts
@HostListener('window:scroll', ['$event'])
onScroll(event: Event) {
  this.scroll$.next(event);
}
```

Using `debounceTime`:

```ts
this.scroll$.pipe(debounceTime(300)).subscribe(() => this.loadMore());
```

---

### 29. How can you create a directive that modifies sibling elements?

A directive can modify sibling elements by accessing the parent container and selecting other elements within it using `ElementRef` or `Renderer2`.

Example:

```ts
@Directive({ selector: "[appHighlightSibling]" })
export class HighlightSiblingDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener("click") onClick() {
    const parent = this.el.nativeElement.parentElement;
    Array.from(parent.children).forEach((child: any) => {
      if (child !== this.el.nativeElement) {
        this.renderer.setStyle(child, "backgroundColor", "lightblue");
      }
    });
  }
}
```

This will highlight sibling elements when the directive's element is clicked.

---

### 30. How do you conditionally apply multiple directives to a single element?

You can apply multiple directives dynamically using `ngClass` or `ngIf` within Angular templates or by dynamically adding directives in the component logic.

Example using `ngClass`:

```html
<div
  [ngClass]="{ 'directive-one': condition1, 'directive-two': condition2 }"
></div>
```

Example using `*ngIf`:

```html
<div *ngIf="condition" appFirstDirective appSecondDirective></div>
```

Dynamically adding directives in TypeScript:

```ts
@ViewChild('myElement', { read: ViewContainerRef }) container!: ViewContainerRef;

applyDirective(condition: boolean) {
  if (condition) {
    this.container.createComponent(MyDirective);
  }
}
```

### **Component Projection**

### 31. Can content projection be used inside Angular's standalone components?

Yes, content projection can be used inside standalone components. Standalone components support `<ng-content>` just like module-based components. Since standalone components do not rely on `NgModule`, you must ensure that the dependencies required for content projection are properly imported.

Example:

```ts
@Component({
  selector: "app-card",
  standalone: true,
  template: `<div class="card"><ng-content></ng-content></div>`,
})
export class CardComponent {}
```

---

### 32. How can you implement nested content projection in Angular?

Nested content projection allows a component to accept multiple content areas. This is done using multiple `<ng-content>` elements with the `select` attribute.

Example:

```html
<app-card>
  <div class="header" select="header">Header Content</div>
  <div class="body">Body Content</div>
</app-card>
```

Component:

```ts
@Component({
  selector: "app-card",
  standalone: true,
  template: `
    <div class="card">
      <ng-content select=".header"></ng-content>
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
```

---

### 33. How does Angular handle `ng-content` updates when projected content changes dynamically?

Angular updates projected content automatically when the parent component changes. Since content projection does not create a new view but rather inserts content into an existing one, updates are reflected as per Angular’s change detection mechanism.

However, if the projected content is generated dynamically (e.g., using `*ngIf` or `*ngFor`), Angular ensures updates are propagated.

Example:

```html
<app-card>
  <p *ngIf="showText">Dynamic Content</p>
</app-card>
```

If `showText` changes, Angular will re-evaluate and update the projected content accordingly.

---

### 34. What are the limitations of content projection in Angular?

- **Projected content is not part of the child component’s view**: It remains within the parent component’s scope.
- **Cannot bind directly to the child component**: You cannot use `@Input()` or `@Output()` inside projected content.
- **Limited styling scope**: Styles in the child component may not apply to projected content unless `::ng-deep` is used.
- **Performance considerations**: Large or deeply nested projections can affect rendering performance.

---

### 35. How do you debug issues with `ng-content` rendering?

- **Check for correct selectors**: Ensure the `select` attribute in `<ng-content>` matches the projected elements.
- **Inspect the DOM**: Use browser DevTools to check if content is being projected correctly.
- **Check component lifecycle**: Ensure that projected content is available when the child component initializes.
- **Use `@ContentChild()` or `@ContentChildren()`**: To verify projected content is being recognized.

Example Debugging:

```ts
@ContentChild('header') headerContent!: ElementRef;
ngAfterContentInit() {
  console.log('Projected header content:', this.headerContent);
}
```
