# Routing in Angular
Angular Router is a powerful JavaScript router built and maintained by the Angular core team that can be installed from the `@angular/router` package. It is a complete routing library with the ability to load, display, and navigate between multiple views in an Angular application. The Angular Router is a key feature that differentiates Angular from other JavaScript frameworks.

In this chapter, we will learn how to set up routing in an Angular application, how to define routes, and how to navigate between different views using the Angular Router.

## Setting up routing
To set up routing in an Angular application, we need to perform the following steps:

1. Install the Angular Router package.
2. Define routes in the application.
3. Set up the router outlet in the application's main component.
4. Add navigation links to navigate between different views.

### Installing the Angular Router
The Angular Router is a separate package that needs to be installed in an Angular application. To install the Angular Router, run the following command:

```bash
npm install @angular/router
```

### Enabling routing in the application
**Defining routes**

Routes in Angular are defined using the `Routes` array. Each route is an object with the following properties:

- `path`: The URL path for the route.
- `component`: The component that should be displayed when the route is activated.


`app.routes.ts`:
```typescript
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
]
```

**Setting up the router in application**
`main.ts`:
```typescript
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {routes} from './app.routes';

bootstrapAppllication(AppComponent, {
  providers: [provideRouter(
    routes,  // routes defined in app.routes.ts
    withComponentInputBinding(), // if we want to read params using signal input
    withRouterConfig({paramsInheritanceStrategy: 'always'}) // allow parant params to read throught input signal in child components
    )] 
  

  });
```

**Rendering routes in the application**
`app.component.html`:
```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
</nav>
<router-outlet />
```

### Dynamic routing
In addition to static routes, Angular Router also supports dynamic routes. Dynamic routes are defined using route parameters. Route parameters are placeholders in the URL that can be used to pass data to the route.

`app.routes.ts`:
```typescript
export const routes: Routes = [
  {path: 'product/:id', component: ProductDetailComponent},
]
```
usage:
```html
<a routerLink]="['/product', product.id]">{{product.name}}</a>
```

### getting route parameters
```typescript
import {ActivatedRoute} from '@angular/router';

export class ProductDetailComponent {
  // using input signal
  id = input.required(); // same name as param in the route configuration

  // if not using input signal
  @Input({required: true}) id: string;


  //using observables -> in OLD angular versions
  constructor(private router: ActivatedRoute) {
    this.router.paramsMap.subscribe(params => {
      console.log(params.get('id'));
    });
  }
}
```

### routerLinkActive
`routerLinkActive` directive is used to apply a CSS class to an element when the link is active.

```html
<nav>
  <a routerLink="/" routerLinkActive="active">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
</nav>
```


## Nested routes

Nested routes are routes that are defined within other routes. Nested routes allow us to create a hierarchy of routes in an Angular application.

To define nested routes, we need to nest the `children` property inside the parent route object.

`app.routes.ts`:
```typescript
export const routes: Routes = [
  {path: 'products', component: ProductsComponent, children: [
    {path: '', component: ProductListComponent},
    {path: ':id', component: ProductDetailComponent},
  ]}
]
```

`products.component.html`:
```html
<nav>
  <a routerLink="/">Product List</a>
  <a routerLink="/product/1">Product 1</a>
  <a routerLink="/product/2">Product 2</a>
</nav>
<router-outlet />
```

### Accessing Parent route data from Inside Nested Routes
To access parent route data from inside nested routes, we can use the `ActivatedRoute` service.

```typescript
import {ActivatedRoute} from '@angular/router';

export class ProductDetailComponent {
  // using input signal
  id = input.required(); // same name as param in the route configuration

  //OLD angular versions
  constructor(private route: ActivatedRoute) {
    this.route.parent.data.subscribe(data => {
      console.log(data);
    });
  }
}
```

## Dynamic routing
In addition to static routes, Angular Router also supports dynamic routes. Dynamic routes are defined using route parameters. Route parameters are placeholders in the URL that can be used to pass data to the route.

`app.routes.ts`:
```typescript
export const routes: Routes = [
  {path: 'product/:id', component: ProductDetailComponent},
]
```
usage: 
```typescript
this.router = inject(Router);
// or
// constructor(private router: Router) {}

navigateToProduct(id: string) {
  this.router.navigate(['/product', id]);
}
```

### Going to the previous route
```html
<button (click)="goBack()">Go Back</button>
```

```typescript
import {Location} from '@angular/common';

export class ProductDetailComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
```
**OR**
```html
<!-- up one level -->
<a routerLink="../">Go Back</a>
```

## NOT FOUND route
`app.routes.ts`:
```typescript
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', component: NotFoundComponent},
]
```

## Redirecting routes
To redirect a route to another route, we can use the `redirectTo` property in the route configuration.

`app.routes.ts`:
```typescript
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', redirectTo: '/about', pathMatch: 'prefix'}, // prefix means that the redirect will happen if the URL starts with /contact
]
```

## Query parameters
Query parameters are used to pass data to a route using the URL. Query parameters are appended to the URL after a question mark (`?`) and are separated by an ampersand (`&`).

To access query parameters in a route, we can use the `ActivatedRoute` service.

```html
<a routerLink="/product/1" [queryParams]="{order: 'asc'}">Product 1</a>
```

```typescript
import {ActivatedRoute} from '@angular/router';

export class ProductDetailComponent {
  // using input signal
  order = input<'asc'| 'desc'>();

  //OLD angular versions
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      console.log(params.order);
    });
  }
}
```

## Data sharing between routes
To share data between routes, we can use the `data` property in the route configuration.

`app.routes.ts`:
```typescript
export const routes: Routes = [
  {path: 'product/:id', component: ProductDetailComponent, data: {title: 'Product Detail'}},
]
```
Reading data:
```typescript
import {ActivatedRoute} from '@angular/router';

export class ProductDetailComponent {
  // using input signal
  title = input.required(); // same name as data property in the route configuration

  //OLD angular versions
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      console.log(data.title);
    });
  }
}
```

## Data resolvers
Data resolvers are used to fetch data before activating a route. Data resolvers are functions that return data that is required by the route.

To use a data resolver, we need to define a `resolve` property in the route configuration.

`app.routes.ts`:
```typescript
export const routes: Routes = [
  {path: 'product/:id', component: ProductDetailComponent, resolve: {product: ProductResolver}},
]
```
ProductResolver:
```typescript
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductService} from './product.service';

export class ProductResolver implements Resolve<Product> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    return this.productService.getProduct(route.params.id);
  }
}
```
## Route guards
Route guards are used to protect routes in an Angular application. Route guards are functions that are executed before activating a route. They can be used to prevent unauthorized access to routes, redirect users to a login page, or perform other actions before activating a route.

There are four types of route guards in Angular:
1. CanActivate: Used to prevent a route from being activated.
2. CanActivateChild: Used to prevent a child route from being activated.
3. CanDeactivate: Used to prevent a route from being deactivated.
4. CanMatch: Used to prevent a route from being loaded.

To use a route guard, we need to define a `canMatch` property in the route configuration.

```typescript
export const routes: Routes = [
  {path: 'product/:id', component: ProductDetailComponent, canMatch: [AuthGuard]},
]
```
AuthGuard:
```typescript
import {CanMatch, Router} from '@angular/router';

export class AuthGuard implements CanMatch {
  constructor(private router: Router) {}

  canMatch(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```