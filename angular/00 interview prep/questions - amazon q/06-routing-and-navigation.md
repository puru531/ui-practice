# Angular Routing and Navigation Interview Questions

## 1. What are the basic concepts of Angular Routing?
```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
```

## 2. How do you implement route parameters?
```typescript
// Route configuration
{ path: 'users/:id', component: UserComponent }

// Access parameters
constructor(private route: ActivatedRoute) {
  // Snapshot approach
  const id = this.route.snapshot.paramMap.get('id');

  // Observable approach
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
  });
}
```

## 3. What are Route Guards and how do you implement them?
```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return this.auth.isLoggedIn();
  }
}

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  }
];
```

## 4. How do you implement child routes?
```typescript
const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: ':id', component: UserDetailComponent },
      { path: ':id/edit', component: UserEditComponent }
    ]
  }
];
```

## 5. What are the different types of Route Guards?
```typescript
// CanActivate
canActivate(): boolean {
  return this.checkAuth();
}

// CanDeactivate
canDeactivate(component: ComponentType): boolean {
  return component.hasUnsavedChanges();
}

// CanLoad
canLoad(): boolean {
  return this.checkPermissions();
}

// Resolve
resolve(): Observable<any> {
  return this.service.getData();
}
```

## 6. How do you implement lazy loading?
```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  }
];
```

## 7. What are Route Resolvers?
```typescript
@Injectable()
export class DataResolver implements Resolve<any> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.service.getData(route.params.id);
  }
}

const routes: Routes = [
  {
    path: 'data/:id',
    component: DataComponent,
    resolve: {
      data: DataResolver
    }
  }
];
```

## 8. How do you handle navigation programmatically?
```typescript
export class NavigationComponent {
  constructor(private router: Router) {}

  navigate() {
    // Simple navigation
    this.router.navigate(['/users']);

    // With parameters
    this.router.navigate(['/users', userId]);

    // With query parameters
    this.router.navigate(['/users'], {
      queryParams: { page: 1, sort: 'name' }
    });
  }
}
```

## 9. What are the different navigation events?
```typescript
constructor(private router: Router) {
  router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      // Navigation started
    }
    if (event instanceof NavigationEnd) {
      // Navigation completed
    }
    if (event instanceof NavigationError) {
      // Navigation failed
    }
  });
}
```

## 10. How do you implement route animations?
```typescript
@Component({
  animations: [
    trigger('routeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
```

## 11. What are auxiliary routes?
```typescript
const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
    outlet: 'aux'
  }
];

// Template
<router-outlet></router-outlet>
<router-outlet name="aux"></router-outlet>
```

## 12. How do you handle route data?
```typescript
const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'Users List', roles: ['admin'] }
  }
];

constructor(private route: ActivatedRoute) {
  this.route.data.subscribe(data => {
    this.title = data.title;
  });
}
```

## 13. What is RouterLink and how to use it?
```typescript
// Simple link
<a routerLink="/users">Users</a>

// With parameters
<a [routerLink]="['/users', user.id]">User Details</a>

// With query parameters
<a [routerLink]="['/users']" 
   [queryParams]="{ page: 1 }">Users</a>
```

## 14. How do you implement route preloading?
```typescript
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ]
})

// Custom preloading strategy
@Injectable()
export class CustomPreloadingStrategy implements PreloadAllModules {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.preload ? load() : of(null);
  }
}
```

## 15. What are route guards' best practices?
- Keep guards focused
- Handle async operations properly
- Implement proper error handling
- Use appropriate guard types
- Consider performance impact

## 16. Tricky: How do you handle circular routing dependencies?
```typescript
// Using loadChildren to break circular dependency
{
  path: 'feature',
  loadChildren: () => import('./feature/feature.module')
    .then(m => m.FeatureModule)
}
```

## 17. How do you implement route parameter inheritance?
```typescript
const routes: Routes = [
  {
    path: 'users/:id',
    component: UserComponent,
    children: [
      {
        path: 'details',
        component: UserDetailsComponent,
        // Inherits id parameter
      }
    ]
  }
];
```

## 18. What is the difference between path and redirectTo?
```typescript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];
```

## 19. How do you handle route error states?
```typescript
@Injectable()
export class ErrorHandler implements ErrorHandler {
  handleError(error: any) {
    if (error instanceof RouteError) {
      // Handle route specific errors
    }
  }
}
```

## 20. How do you test routing?
```typescript
describe('Routing', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should navigate', fakeAsync(() => {
    router.navigate(['/users']);
    tick();
    expect(location.path()).toBe('/users');
  }));
});
```