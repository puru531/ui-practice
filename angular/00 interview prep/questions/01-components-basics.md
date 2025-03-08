# Angular Components Basics Interview Questions

## 1. What are components in Angular and why are they considered the building blocks?
Components are the fundamental building blocks of Angular applications. They are independent and reusable pieces of UI that combine a TypeScript class, an HTML template, and styles. They control a portion of the view in the application.

## 2. Explain the difference between @Input() and @Output() decorators
- **@Input()** is used to pass data from parent to child component
- **@Output()** is used to emit events from child to parent component
- Example showing key differences:
```typescript
// Child Component
@Input() data: string;  // Receives data
@Output() notify = new EventEmitter<string>();  // Emits events

// Parent Component Template
<app-child [data]="parentData" (notify)="handleNotification($event)"></app-child>
```

## 3. What is ViewEncapsulation and what are its different types?
ViewEncapsulation determines how the styles defined in a component's CSS file affect the rest of the application.
- **Emulated (default)**: Scopes styles to the component
- **None**: No encapsulation, styles are global
- **ShadowDom**: Uses browser's native shadow DOM implementation

## 4. What is the purpose of ngOnInit() and how is it different from constructor?
- Constructor is a TypeScript feature used for class initialization
- ngOnInit is an Angular lifecycle hook that runs after the component is initialized
- Constructor runs before Input properties are set
- ngOnInit runs after Input properties are set

## 5. What are template reference variables and how do you use them?
Template reference variables are references to DOM elements or directives in templates.
```typescript
<input #myInput type="text">
<button (click)="logValue(myInput.value)">Log Value</button>
```

## 6. Explain @ViewChild decorator and its common use cases
@ViewChild provides access to child elements in the component's template.
```typescript
@ViewChild('myInput') input: ElementRef;
@ViewChild(ChildComponent) child: ChildComponent;
```

## 7. What is the difference between template-driven and reactive forms?
- Template-driven forms: More suitable for simple forms, uses NgModel
- Reactive forms: More robust, better for complex forms, uses FormGroup/FormControl

## 8. How do you handle form validation in Angular?
```typescript
// Reactive Form Example
this.form = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]]
});
```

## 9. What are Angular pipes and how do you create a custom pipe?
Pipes transform displayed values in templates. Custom pipe example:
```typescript
@Pipe({name: 'exponential'})
export class ExponentialPipe implements PipeTransform {
  transform(value: number, exponent = 1): number {
    return Math.pow(value, exponent);
  }
}
```

## 10. How do you optimize performance in Angular components?
- Use OnPush change detection strategy
- Use pure pipes
- Implement trackBy function with ngFor
- Lazy load components/modules
- Use web workers for heavy computations

## 11. What are lifecycle hooks in Angular and in what order are they called?
Order: constructor → ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit → ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked → ngOnDestroy

## 12. What is host binding and host listener?
```typescript
@HostBinding('class.active') isActive = false;
@HostListener('click') onClick() {
  this.isActive = !this.isActive;
}
```

## 13. How do you share data between unrelated components?
- Using a shared service
- Using state management (NgRx)
- Using BehaviorSubject
- Using event bus pattern

## 14. What are dynamic components and how do you create them?
Dynamic components are created programmatically at runtime:
```typescript
const componentRef = this.viewContainerRef.createComponent(DynamicComponent);
componentRef.instance.data = 'Some data';
```

## 15. Explain the difference between ngOnChanges and ngDoCheck
- ngOnChanges: Called when an input property changes
- ngDoCheck: Called during every change detection run

## 16. What are template expressions and template statements?
- Template expressions: Resolve to a value ({{ expression }})
- Template statements: Respond to events ((event)="statement")

## 17. What is Angular Ivy and what benefits does it provide?
Ivy is Angular's next-generation compilation and rendering pipeline:
- Smaller bundle size
- Faster compilation
- Better debugging
- Improved template type checking

## 18. Tricky Question: Why might you get ExpressionChangedAfterItHasBeenCheckedError?
This error occurs when:
- A value changes after change detection has run
- Common in ngAfterViewInit
- Solution involves using setTimeout or async operations

## 19. What is the difference between interpolation and property binding?
```typescript
// Interpolation
<div>{{name}}</div>

// Property Binding
<div [innerHTML]="name"></div>
```

## 20. How do you implement error handling in components?
- Using try-catch blocks
- Error boundaries
- Global error handler
- RxJS error handling operators