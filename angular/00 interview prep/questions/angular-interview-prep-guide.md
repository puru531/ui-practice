# Angular Interview Preparation Guide (6+ Years Experience)

## Table of Contents
1. [Component Basics](#component-basics)
2. [Component Communication](#component-communication)
3. [Component Architecture](#component-architecture)
4. [Services and Dependency Injection](#services-and-di)
5. [Change Detection](#change-detection)
6. [Routing](#routing)
7. [State Management](#state-management)
8. [RxJS Deep Dive](#rxjs-deep-dive)
9. [Advanced Concepts](#advanced-concepts)
10. [Tricky Questions](#tricky-questions)

## Component Basics

### @Input() and @Output()
- **@Input()**: Decorator that marks a class property as an input property and supplies configuration metadata
```typescript
@Input() item: string;
@Input('aliasName') originalName: string; // with alias
```

- **@Output()**: Decorator that marks a class property as an output property and supplies configuration metadata
```typescript
@Output() newItemEvent = new EventEmitter<string>();
```

### ViewChild and Template Reference
```typescript
// ViewChild example
export class ParentComponent {
  @ViewChild(ChildComponent) childComponent: ChildComponent;
  @ViewChild('templateRef') templateRef: ElementRef;
}

// Template reference variables
<input #myInput type="text">
<button (click)="logInput(myInput.value)">Log Input</button>
```

### Content Projection (ng-content)
```typescript
// Parent template
<app-card>
  <div class="header">Header content</div>
  <div class="body">Body content</div>
</app-card>

// Child template (app-card)
<div class="card">
  <ng-content select=".header"></ng-content>
  <ng-content select=".body"></ng-content>
</div>
```

### ng-container and ng-template
```typescript
// ng-container for structural directives
<ng-container *ngIf="items$ | async as items">
  <div *ngFor="let item of items">{{item.name}}</div>
</ng-container>

// ng-template with contextual variables
<ng-template #loading let-message="message">
  <div>{{message}}</div>
</ng-template>
```

## Component Communication

### Parent to Child
```typescript
// Parent
<app-child [data]="parentData"></app-child>

// Child
@Input() data: any;
```

### Child to Parent
```typescript
// Child
@Output() dataChange = new EventEmitter<any>();
this.dataChange.emit(newValue);

// Parent
<app-child (dataChange)="handleChange($event)"></app-child>
```

### Sibling Communication (Service)
```typescript
// Shared service
@Injectable({providedIn: 'root'})
export class DataService {
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  updateData(data: any) {
    this.dataSubject.next(data);
  }
}
```

## Services and Dependency Injection

### Service Creation and Providers
```typescript
@Injectable({
  providedIn: 'root' // singleton service
})
export class MyService {
  constructor() {}
}

// Component-level provider
@Component({
  providers: [MyService] // new instance per component
})
```

### Modern Injection Pattern (inject function)
```typescript
// Traditional constructor injection
constructor(private service: MyService) {}

// Modern inject function (standalone components)
private service = inject(MyService);
```

### Custom Providers
```typescript
// Value provider
{ provide: API_URL, useValue: 'http://api.example.com' }

// Class provider
{ provide: Logger, useClass: CustomLogger }

// Factory provider
{ 
  provide: ConfigService,
  useFactory: (http: HttpClient) => new ConfigService(http),
  deps: [HttpClient]
}
```

### HTTP Interceptors
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.getToken())
    });
    return next.handle(authReq);
  }
}
```

## Change Detection

### ChangeDetectionStrategy
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### Signals (Angular 16+)
```typescript
// Creating signals
const count = signal(0);
const doubled = computed(() => count() * 2);

// Using signals in components
@Component({
  template: `
    <p>Count: {{ count() }}</p>
    <p>Doubled: {{ doubled() }}</p>
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);

  increment() {
    this.count.update(value => value + 1);
  }
}
```

### Zone.js
- Purpose: Automatic change detection in Angular
- Key concepts:
  - Monkey patching of async operations
  - NgZone service
  - runOutsideAngular()

## Routing

### Basic Configuration
```typescript
const routes: Routes = [
  { 
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: ':id', component: ProductDetailComponent }
    ]
  }
];
```

### Guards and Resolvers
```typescript
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return this.checkAuth();
  }
}

@Injectable({providedIn: 'root'})
export class DataResolver implements Resolve<any> {
  resolve(): Observable<any> {
    return this.service.getData();
  }
}
```

### Advanced Routing
```typescript
// Lazy loading
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule)
}

// Preloading strategies
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })]
})
```

## State Management (NgRx)

### Actions
```typescript
export const loadItems = createAction('[Item List] Load Items');
export const loadItemsSuccess = createAction(
  '[Item List] Load Items Success',
  props<{ items: Item[] }>()
);
```

### Effects
```typescript
@Injectable()
export class ItemEffects {
  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType(loadItems),
    mergeMap(() => this.itemsService.getItems()
      .pipe(
        map(items => loadItemsSuccess({ items })),
        catchError(() => of(loadItemsError()))
      ))
  ));

  constructor(
    private actions$: Actions,
    private itemsService: ItemsService
  ) {}
}
```

### Reducers
```typescript
export const itemReducer = createReducer(
  initialState,
  on(loadItems, state => ({ ...state, loading: true })),
  on(loadItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false
  }))
);
```

### Selectors
```typescript
export const selectItems = createSelector(
  selectFeature,
  (state: FeatureState) => state.items
);

export const selectItemById = (id: string) => createSelector(
  selectItems,
  (items) => items.find(item => item.id === id)
);
```

## RxJS Deep Dive

### Higher Order Mapping Operators
```typescript
// switchMap - cancels previous inner observable
this.searchTerms$.pipe(
  switchMap(term => this.service.search(term))
);

// mergeMap - concurrent execution
this.userIds$.pipe(
  mergeMap(id => this.service.getUser(id))
);

// concatMap - sequential execution
this.userIds$.pipe(
  concatMap(id => this.service.getUser(id))
);

// exhaustMap - ignores new outer values while inner is active
this.clicks$.pipe(
  exhaustMap(() => this.service.getData())
);
```

### Subjects
```typescript
// BehaviorSubject - requires initial value, emits current value
const behavior = new BehaviorSubject<number>(0);

// ReplaySubject - remembers n previous values
const replay = new ReplaySubject<number>(2);

// Subject - no value caching
const subject = new Subject<number>();

// AsyncSubject - only emits last value on completion
const async = new AsyncSubject<number>();
```

### Hot vs Cold Observables
```typescript
// Cold Observable (unique execution per subscriber)
const cold$ = of(Math.random());

// Hot Observable (shared execution)
const hot$ = cold$.pipe(share());
```

## Advanced Concepts

### Standalone Components
```typescript
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-standalone',
  template: `<div>Standalone Component</div>`
})
export class StandaloneComponent {}
```

### Custom Directives
```typescript
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input('appHighlight') highlightColor: string;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight(this.highlightColor || 'yellow');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

### Performance Optimization
- OnPush change detection
- Pure pipes
- TrackBy function in ngFor
- Lazy loading
- Virtual scrolling

## Tricky Questions

1. **What's the difference between ViewChild and ContentChild?**
   - ViewChild: References elements in component's template
   - ContentChild: References projected content

2. **How does Zone.js work with Angular?**
   - Monkey patches async operations
   - Helps Angular detect changes automatically
   - Can be disabled for performance optimization

3. **Why use async pipe vs subscribe?**
   - Automatic subscription management
   - Automatic unsubscription
   - Integration with change detection

4. **What happens if you subscribe to a subject after it emits?**
   - BehaviorSubject: Gets last value
   - ReplaySubject: Gets cached values
   - Regular Subject: Misses previous emissions
   - AsyncSubject: Gets nothing until completion

5. **What are the edge cases with OnPush?**
   - Object mutations not detected
   - Array modifications not detected
   - Need manual change detection triggers

6. **How would you handle memory leaks?**
   - Use takeUntil pattern
   - Implement ngOnDestroy
   - Use async pipe
   - Proper unsubscribe in components

7. **Explain the ExpressionChangedAfterItHasBeenCheckedError**
   - Occurs when value changes after change detection
   - Common in ngAfterViewInit
   - Solution: Use setTimeout or similar async operation

8. **What's the difference between constructor and ngOnInit?**
   - Constructor: Class initialization
   - ngOnInit: Component initialization after inputs

9. **How to handle circular dependencies?**
   - Use forwardRef
   - Restructure services
   - Use events or subjects

10. **Explain NgRx Effects vs Services**
    - Effects: Side effects management
    - Services: Business logic
    - Effects should delegate to services

Remember to regularly update your knowledge as Angular evolves with new features and best practices.