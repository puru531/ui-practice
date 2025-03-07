# Angular Change Detection Interview Questions

## 1. What is Change Detection in Angular?
Change Detection is the process by which Angular keeps the view in sync with the component's data. It:
- Tracks changes in component properties
- Updates the DOM accordingly
- Ensures UI consistency

## 2. What is ChangeDetectionStrategy?
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {}
```
Two strategies:
- Default: Checks all components
- OnPush: Only checks on reference changes

## 3. How do Signals work in Angular?
```typescript
// Creating signals
const count = signal(0);
const doubled = computed(() => count() * 2);

// Using in components
@Component({
  template: `
    Count: {{ count() }}
    Doubled: {{ doubled() }}
  `
})
export class CounterComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);
}
```

## 4. What triggers Change Detection?
- Events (click, submit, etc.)
- XHR/Fetch requests
- Timers (setTimeout, setInterval)
- Promises
- Observables
- Signal updates

## 5. How does Zone.js work with Change Detection?
```typescript
// Disable zone.js for a section
constructor(private ngZone: NgZone) {
  this.ngZone.runOutsideAngular(() => {
    // Change detection won't be triggered
  });
}
```

## 6. What are the common performance issues with Change Detection?
- Unnecessary checks
- Deep object comparisons
- Large component trees
- Synchronous operations
- Frequent updates

## 7. How do you optimize Change Detection?
```typescript
// Use OnPush
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Use trackBy with ngFor
<div *ngFor="let item of items; trackBy: trackByFn">

// Manual change detection
export class MyComponent {
  constructor(private cd: ChangeDetectorRef) {
    this.cd.detectChanges();
  }
}
```

## 8. What is ChangeDetectorRef and when to use it?
```typescript
export class MyComponent {
  constructor(private cd: ChangeDetectorRef) {}

  detach() {
    this.cd.detach(); // Stop automatic detection
  }

  reattach() {
    this.cd.reattach(); // Resume automatic detection
  }

  check() {
    this.cd.detectChanges(); // Manual detection
  }
}
```

## 9. How do Observables affect Change Detection?
```typescript
// Automatic change detection
data$ = this.service.getData();
<div>{{ data$ | async }}</div>

// Manual change detection
this.service.getData().subscribe(data => {
  this.data = data;
  this.cd.detectChanges();
});
```

## 10. What are the benefits of using Signals over traditional properties?
- Fine-grained updates
- Automatic dependency tracking
- Better performance
- More predictable changes
- Improved debugging

## 11. How do you implement custom Change Detection?
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponent implements DoCheck {
  ngDoCheck() {
    // Custom change detection logic
  }
}
```

## 12. What is ExpressionChangedAfterItHasBeenCheckedError?
```typescript
ngAfterViewInit() {
  // This will cause the error
  this.title = 'New Title';

  // Fix using setTimeout
  setTimeout(() => {
    this.title = 'New Title';
  });
}
```

## 13. How do you handle async operations with Change Detection?
```typescript
// Using async pipe (recommended)
data$ = this.service.getData();
<div>{{ data$ | async }}</div>

// Manual subscription
ngOnInit() {
  this.subscription = this.service.getData()
    .subscribe(data => {
      this.data = data;
      this.cd.detectChanges();
    });
}
```

## 14. What is the difference between markForCheck() and detectChanges()?
```typescript
// markForCheck() - marks path to root for checking
this.cd.markForCheck();

// detectChanges() - immediate check of component and children
this.cd.detectChanges();
```

## 15. How do you debug Change Detection issues?
```typescript
// Enable debug mode
import { enableDebugTools } from '@angular/platform-browser';

// Profile change detection
ng.profiler.timeChangeDetection();
```

## 16. Tricky: How do mutable operations affect Change Detection?
```typescript
// This won't trigger OnPush detection
this.items.push(newItem);

// This will trigger OnPush detection
this.items = [...this.items, newItem];
```

## 17. How do you implement optimistic updates with Change Detection?
```typescript
updateItem() {
  // Optimistic update
  const updatedItems = [...this.items];
  updatedItems[index] = newItem;
  this.items = updatedItems;

  // API call
  this.service.update(newItem).pipe(
    catchError(error => {
      // Revert on error
      this.items = [...this.originalItems];
      return throwError(() => error);
    })
  );
}
```

## 18. What is the Change Detection tree?
- Unidirectional flow
- Parent to child propagation
- Component hierarchy based
- Can be manually controlled

## 19. How do you handle Change Detection with WebWorkers?
```typescript
@Injectable()
export class WorkerService {
  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      const worker = new Worker('./app.worker');
      worker.onmessage = ({ data }) => {
        this.ngZone.run(() => {
          // Handle data and trigger change detection
        });
      };
    });
  }
}
```

## 20. What are best practices for Change Detection?
- Use OnPush strategy
- Immutable data patterns
- Async pipe for observables
- Proper component breakdown
- Avoid deep object structures
- Use trackBy with ngFor
- Profile and monitor performance