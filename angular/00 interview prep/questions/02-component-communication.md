# Angular Component Communication Interview Questions

## 1. What are the different ways components can communicate in Angular?
- Parent to Child (@Input)
- Child to Parent (@Output)
- View Child/Content Child
- Services
- NgRx/State Management
- Event Bus

## 2. How does content projection work in Angular?
Content projection allows you to insert content inside another component:
```typescript
// Parent
<app-card>
  <h1>Title</h1>
  <p>Content</p>
</app-card>

// Child (app-card)
<div class="card">
  <ng-content></ng-content>
</div>
```

## 3. What is multi-slot content projection?
It allows multiple content projection slots:
```typescript
// Child
<ng-content select="[header]"></ng-content>
<ng-content select="[body]"></ng-content>

// Parent
<app-card>
  <div header>Header Content</div>
  <div body>Body Content</div>
</app-card>
```

## 4. Explain the purpose and usage of ViewChild and ContentChild
```typescript
// ViewChild for template elements
@ViewChild('myTemplate') templateRef: TemplateRef<any>;

// ContentChild for projected content
@ContentChild('projectedContent') projectedContent: ElementRef;
```

## 5. What is the difference between ViewChildren and ContentChildren?
- ViewChildren: Query multiple elements from template
- ContentChildren: Query multiple projected elements

## 6. How do you implement two-way binding in custom components?
```typescript
// Component
@Input() value: string;
@Output() valueChange = new EventEmitter<string>();

// Usage
<app-custom [(value)]="data"></app-custom>
```

## 7. What are template reference variables and how to access them?
```typescript
// Template
<input #myInput>
<button (click)="logValue(myInput.value)">Log</button>

// Component
@ViewChild('myInput') inputRef: ElementRef;
```

## 8. How do you handle component lifecycle events for communication?
```typescript
ngOnInit() {
  // Initialize communication
}

ngOnDestroy() {
  // Clean up subscriptions
}
```

## 9. What is the role of ng-container and when should you use it?
```typescript
<ng-container *ngIf="condition">
  <div>Content</div>
  <div>More Content</div>
</ng-container>
```

## 10. How do you share data between sibling components?
```typescript
@Injectable({providedIn: 'root'})
export class SharedService {
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();
}
```

## 11. What is the difference between ng-template and ng-container?
- ng-template: Template reference that doesn't render by default
- ng-container: Logical container that doesn't create DOM element

## 12. How do you implement component inheritance?
```typescript
export class BaseComponent {
  @Input() common: string;
}

export class ChildComponent extends BaseComponent {
  // Inherits common input
}
```

## 13. What are dynamic components and how to communicate with them?
```typescript
const componentRef = this.viewContainerRef.createComponent(DynamicComponent);
componentRef.instance.data = 'Dynamic Data';
componentRef.instance.output.subscribe(data => console.log(data));
```

## 14. How do you implement component communication using observables?
```typescript
// Service
subject = new Subject<any>();

// Component A
this.service.subject.next(data);

// Component B
this.service.subject.subscribe(data => {});
```

## 15. What is the AfterViewInit lifecycle hook and when to use it?
```typescript
ngAfterViewInit() {
  // Access view children
  this.viewChild.nativeElement.focus();
}
```

## 16. Tricky Question: Why might circular dependencies cause issues in component communication?
- Components depending on each other
- Services with circular dependencies
- Resolution: Use forward references or restructure

## 17. How do you handle component communication in lazy-loaded modules?
- Shared services
- State management
- Events or subjects
- Module-level providers

## 18. What are the best practices for component communication?
- Keep components loosely coupled
- Use proper encapsulation
- Implement proper cleanup
- Follow unidirectional data flow

## 19. How do you implement error boundaries in component communication?
```typescript
@Component({
  template: `
    <ng-container *ngIf="error">
      Error: {{error}}
    </ng-container>
    <ng-container *ngIf="!error">
      <ng-content></ng-content>
    </ng-container>
  `
})
export class ErrorBoundaryComponent implements OnError {
  error: any = null;
  
  handleError(error: any) {
    this.error = error;
  }
}
```

## 20. What is the difference between component events and service events?
- Component events: Local to component tree
- Service events: Application-wide
- Service events persist between route changes