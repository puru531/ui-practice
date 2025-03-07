# Angular Services and Dependency Injection Interview Questions

## 1. What are Services in Angular and why do we need them?
Services are singleton objects that get instantiated only once during the lifetime of an application and provide specific functionality not directly related to views. They:
- Share data between components
- Implement application logic
- Interact with external resources
- Are used for code organization and reusability

## 2. Explain the different injection hierarchies in Angular
```typescript
// Root level (singleton)
@Injectable({
  providedIn: 'root'
})

// Module level
@NgModule({
  providers: [MyService]
})

// Component level
@Component({
  providers: [MyService]
})
```

## 3. What is Tree-Shakable Dependency Injection?
```typescript
@Injectable({
  providedIn: 'root'  // Tree-shakable
})
export class MyService {}

@Injectable({
  providedIn: 'any'  // New instance per module
})
export class PerModuleService {}
```

## 4. How does the new inject() function work compared to constructor injection?
```typescript
// Traditional way
constructor(private service: MyService) {}

// New inject() way
private service = inject(MyService);
private config = inject(CONFIG_TOKEN);
```

## 5. What are the different types of providers in Angular?
```typescript
// Class Provider
{ provide: MyService, useClass: MyServiceImpl }

// Value Provider
{ provide: API_URL, useValue: 'http://api.example.com' }

// Factory Provider
{ 
  provide: MyService,
  useFactory: (http: HttpClient, config: Config) => new MyService(http, config),
  deps: [HttpClient, Config]
}

// Existing Provider
{ provide: NewService, useExisting: ExistingService }
```

## 6. What are Resolution Modifiers and when to use them?
```typescript
constructor(
  @Optional() private service?: MyService,
  @Self() private componentService: MyService,
  @SkipSelf() private parentService: MyService,
  @Host() private hostService: MyService
) {}
```

## 7. How do you handle circular dependencies?
```typescript
// Using forwardRef
constructor(
  @Inject(forwardRef(() => ServiceB)) private serviceB: ServiceB
) {}

// Or restructure services to avoid circular dependency
```

## 8. What are interceptors and how do they work?
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

## 9. How do you manage multiple interceptors?
```typescript
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
```

## 10. What is the difference between singleton services and provided-in-component services?
- Singleton services: One instance shared across the app
- Component-level services: New instance per component
- NgModule-level services: Shared within the module

## 11. How do you test services with dependencies?
```typescript
describe('MyService', () => {
  let service: MyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MyService]
    });
    service = TestBed.inject(MyService);
    httpMock = TestBed.inject(HttpTestingController);
  });
});
```

## 12. What are the best practices for service architecture?
- Single Responsibility Principle
- Immutable state management
- Error handling strategies
- Proper typing and interfaces
- Clear documentation
- Testing considerations

## 13. How do you handle error states in services?
```typescript
getData(): Observable<Data> {
  return this.http.get<Data>('/api/data').pipe(
    catchError(error => {
      this.errorService.handle(error);
      return throwError(() => error);
    }),
    retry(3)
  );
}
```

## 14. What is the difference between providedIn and providers array?
```typescript
// providedIn: Tree-shakable, more optimized
@Injectable({
  providedIn: 'root'
})

// providers: Traditional way, less optimized
@NgModule({
  providers: [MyService]
})
```

## 15. How do you implement caching in services?
```typescript
@Injectable({providedIn: 'root'})
export class CacheService {
  private cache = new Map<string, any>();

  getData(key: string): Observable<any> {
    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    }
    return this.http.get(`/api/${key}`).pipe(
      tap(data => this.cache.set(key, data))
    );
  }
}
```

## 16. Tricky: What happens when you provide the same service at different levels?
```typescript
// Root level
@Injectable({providedIn: 'root'})
export class MyService {}

// Component level (new instance)
@Component({
  providers: [MyService]  // Creates new instance
})

// Which instance will child components get?
// Answer: Closest provider in the injector tree
```

## 17. How do you handle service initialization?
```typescript
@Injectable({providedIn: 'root'})
export class AppInitService {
  init() {
    return new Promise<void>((resolve) => {
      // Initialization logic
      resolve();
    });
  }
}

// In app.module
export function initializeApp(appInitService: AppInitService) {
  return () => appInitService.init();
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService],
      multi: true
    }
  ]
})
```

## 18. What are the common pitfalls with services?
- Memory leaks from unsubscribed observables
- Circular dependencies
- Service pollution (too many responsibilities)
- Improper error handling
- Missing cleanup in ngOnDestroy

## 19. How do you implement state management in services?
```typescript
@Injectable({providedIn: 'root'})
export class StateService {
  private state = new BehaviorSubject<AppState>(initialState);
  state$ = this.state.asObservable();

  updateState(newState: Partial<AppState>) {
    this.state.next({
      ...this.state.value,
      ...newState
    });
  }
}
```

## 20. How do you handle async service initialization?
```typescript
@Injectable({providedIn: 'root'})
export class ConfigService {
  private configSubject = new BehaviorSubject<Config | null>(null);
  config$ = this.configSubject.asObservable();

  async init() {
    const config = await fetch('/api/config').then(r => r.json());
    this.configSubject.next(config);
  }
}
```