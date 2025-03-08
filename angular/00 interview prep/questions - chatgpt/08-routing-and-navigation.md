**Angular Routing & Navigation - Interview Preparation**

# Questions

### **1. Introduction to Routing in Angular**

Routing in Angular enables navigation between different views or pages within a Single Page Application (SPA). The `RouterModule` provides mechanisms for defining, managing, and controlling application routes.

Key concepts:

- **RouterModule and Routes Configuration**
- **RouterOutlet and RouterLink**
- **Lazy Loading & Preloading Strategies**
- **Route Guards (AuthGuard, CanActivate, etc.)**
- **Child Routes and Nested Routing**
- **Query Parameters & Route Parameters**
- **ActivatedRoute & Navigation Events**
- **Standalone Components and Routing**

---

### **2. Basic Questions**

1. What is Angular Routing?
2. How do you configure routes in Angular?
3. What is `RouterModule.forRoot()` and `RouterModule.forChild()`?
4. How do you navigate between routes in Angular?
5. What is the purpose of the `<router-outlet>` directive?
6. What is the difference between `routerLink` and `href` in Angular?
7. How do you pass route parameters in Angular?
8. How do you retrieve query parameters in a component?
9. What is `ActivatedRoute`, and how is it used?
10. What is the difference between path parameters and query parameters?

---

### **3. Conceptual & Intermediate Questions**

11. What is lazy loading in Angular Routing, and how does it work?
12. What are Route Guards, and how do you implement them?
13. How does `CanActivate` differ from `CanDeactivate`?
14. How do you handle wildcard routes (`**`) and redirections?
15. What are auxiliary routes, and when should you use them?
16. How does Angular handle route reloading?
17. How do you manage route animations in Angular?
18. How do you preserve component state when navigating between routes?
19. What is a `Resolve` guard, and how is it used?
20. How does route data work in Angular?

---

### **4. Advanced & Tricky Questions**

21. How do you implement role-based access control using Route Guards?
22. How does Angular optimize routing performance in large applications?
23. What is the difference between lazy loading and preloading strategies?
24. How do you customize route preloading in Angular?
25. What happens when multiple guards are applied to a route?
26. How do you dynamically generate routes in Angular?
27. How do you implement authentication and authorization in Angular Routing?
28. How do you handle navigation errors in Angular?
29. How does `Router.navigateByUrl()` differ from `Router.navigate()`?
30. Can you use Angular Routing without `RouterModule` in Standalone Components?

---

# Answer

## **2. Basic Questions**

### 1. What is Angular Routing?

Angular Routing is a mechanism that allows navigation between different views or pages in a Single Page Application (SPA). It enables users to switch between components dynamically without reloading the entire page.

### 2. How do you configure routes in Angular?

Routes in Angular are configured using the `RouterModule` and the `Routes` array. Each route maps a URL path to a specific component.

**Example:**

```typescript
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

### 3. What is `RouterModule.forRoot()` and `RouterModule.forChild()`?

- `RouterModule.forRoot(routes)`: Used in the root module (typically `AppModule`) to configure global routes for the application.
- `RouterModule.forChild(routes)`: Used in feature modules to configure child routes.

**Example:**

```typescript
@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
```

### 4. How do you navigate between routes in Angular?

Navigation between routes can be done using the `routerLink` directive in templates or programmatically using the `Router` service.

**Using `routerLink` in HTML:**

```html
<a routerLink="/about">Go to About</a>
```

**Using `Router` service in TypeScript:**

```typescript
import { Router } from '@angular/router';

constructor(private router: Router) {}

navigateToAbout() {
  this.router.navigate(['/about']);
}
```

### 5. What is the purpose of the `<router-outlet>` directive?

The `<router-outlet>` directive acts as a placeholder in a template where the routed components will be displayed based on the active route.

**Example:**

```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
</nav>
<router-outlet></router-outlet>
```

This ensures that the corresponding component is rendered inside the `<router-outlet>` when the user navigates to a specific route.

### 6. What is the difference between `routerLink` and `href` in Angular?

- `routerLink` is used for Angular's client-side routing, preventing full page reloads and handling navigation efficiently.
- `href` is a standard HTML attribute that causes a full-page reload when navigating to a different URL.

**Example:**

```html
<a routerLink="/about">Angular Routing</a>
<!-- No full reload -->
<a href="/about">Traditional Link</a>
<!-- Causes full reload -->
```

### 7. How do you pass route parameters in Angular?

Route parameters allow passing dynamic values in the URL. They are defined in the route configuration using `:param` syntax.

**Example:**

```typescript
const routes: Routes = [{ path: "user/:id", component: UserComponent }];
```

**Navigating with parameters:**

```html
<a [routerLink]="['/user', userId]">Go to User</a>
```

### 8. How do you retrieve query parameters in a component?

Query parameters are retrieved using the `ActivatedRoute` service.

**Example:**

```typescript
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    console.log(params['category']);
  });
}
```

### 9. What is `ActivatedRoute`, and how is it used?

`ActivatedRoute` is an Angular service that provides access to route-specific information such as path parameters, query parameters, and route data.

**Example:**

```typescript
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.params.subscribe(params => {
    console.log(params['id']);
  });
}
```

### 10. What is the difference between path parameters and query parameters?

- **Path Parameters**: Part of the URL structure, used for navigation.
  - Example: `/user/123`
  - Defined in route as `path: 'user/:id'`
- **Query Parameters**: Key-value pairs appended to the URL after `?`.
  - Example: `/products?category=electronics`
  - Used for filtering, sorting, or optional data passing.

Both can be retrieved using `ActivatedRoute`.

---

## **3. Conceptual & Intermediate Questions**

### 11. What is lazy loading in Angular Routing, and how does it work?

Lazy loading is a technique in Angular that loads feature modules only when they are needed, instead of loading them at the initial application startup. This improves performance by reducing the initial bundle size.

**Implementation:**

```typescript
const routes: Routes = [
  {
    path: "feature",
    loadChildren: () =>
      import("./feature/feature.module").then((m) => m.FeatureModule),
  },
];
```

This ensures the `FeatureModule` is only loaded when the user navigates to `/feature`.

---

### 12. What are Route Guards, and how do you implement them?

Route Guards in Angular are used to control access to routes. They help prevent unauthorized access, unsaved changes, or perform checks before navigation.

**Example:** Implementing an `AuthGuard` using `CanActivate`.

```typescript
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = false; // Replace with actual auth check
    if (!isAuthenticated) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
```

**Applying the guard to a route:**

```typescript
const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
```

---

### 13. How does `CanActivate` differ from `CanDeactivate`?

- **`CanActivate`**: Prevents users from accessing a route if a condition is not met (e.g., authentication check).
- **`CanDeactivate`**: Prevents users from leaving a route if certain conditions are not met (e.g., unsaved changes warning).

**Example of `CanDeactivate`:**

```typescript
import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

@Injectable({ providedIn: "root" })
export class UnsavedChangesGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(component: CanComponentDeactivate): boolean {
    return (
      component.canDeactivate() || confirm("You have unsaved changes. Leave?")
    );
  }
}
```

**Applying `CanDeactivate` to a route:**

```typescript
const routes: Routes = [
  {
    path: "form",
    component: FormComponent,
    canDeactivate: [UnsavedChangesGuard],
  },
];
```

---

### 14. How do you handle wildcard routes (`**`) and redirections?

Wildcard routes are used to catch invalid or undefined routes and redirect users appropriately.

**Example:** Redirecting to a `NotFoundComponent`.

```typescript
const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];
```

- `redirectTo: '/home'` redirects empty paths to `/home`.
- `path: '**'` catches all undefined routes and displays a custom 404 page.

---

### 15. What are auxiliary routes, and when should you use them?

Auxiliary routes (a.k.a. secondary routes) allow multiple router-outlets in a single Angular component, enabling simultaneous views.

**Example:** Defining primary and secondary (auxiliary) routes.

```typescript
const routes: Routes = [
  { path: "profile", component: ProfileComponent, outlet: "sidebar" },
];
```

**Navigating using auxiliary routes:**

```html
<a [routerLink]="['/', { outlets: { sidebar: 'profile' } }]"
  >Open Profile in Sidebar</a
>
```

Auxiliary routes are useful for sidebars, modals, or chat windows without affecting the primary route.

---

### 16. How does Angular handle route reloading?

By default, Angular does not reload the route if the same URL is navigated to again. To enable route reloading, you can use the `runGuardsAndResolvers` option in the route configuration or manually trigger a reload using the `Router` service.

**Example:**

```typescript
this.router.routeReuseStrategy.shouldReuseRoute = () => false;
this.router.onSameUrlNavigation = "reload";
this.router.navigate([this.router.url]);
```

This forces the route to reload when navigating to the same URL.

---

### 17. How do you manage route animations in Angular?

Angular provides the `@angular/animations` module to animate route transitions using the `trigger`, `transition`, and `animate` functions.

**Example:**

```typescript
import { trigger, transition, style, animate } from "@angular/animations";

export const routeAnimations = trigger("routeAnimations", [
  transition("* <=> *", [
    style({ opacity: 0 }),
    animate("300ms ease-in", style({ opacity: 1 })),
  ]),
]);
```

Apply the animation to the `<router-outlet>` in the component.

```html
<router-outlet [@routeAnimations]="prepareRoute(outlet)"></router-outlet>
```

---

### 18. How do you preserve component state when navigating between routes?

Component state can be preserved using services, route data, or state management libraries like NgRx.

**Example:** Using a service to store state:

```typescript
@Injectable({ providedIn: "root" })
export class StateService {
  private data: any;
  setData(value: any) {
    this.data = value;
  }
  getData() {
    return this.data;
  }
}
```

Store data before navigation and retrieve it after navigation.

---

### 19. What is a `Resolve` guard, and how is it used?

A `Resolve` guard prefetches data before loading a component, ensuring the necessary data is available.

**Example:**

```typescript
@Injectable({ providedIn: "root" })
export class DataResolver implements Resolve<any> {
  constructor(private service: DataService) {}
  resolve(): Observable<any> {
    return this.service.getData();
  }
}
```

Apply it to a route:

```typescript
const routes: Routes = [
  {
    path: "details",
    component: DetailsComponent,
    resolve: { data: DataResolver },
  },
];
```

---

### 20. How does route data work in Angular?

Route data allows passing static data to routes, accessible via `ActivatedRoute`.

**Example:** Defining route data.

```typescript
const routes: Routes = [
  {
    path: "info",
    component: InfoComponent,
    data: { title: "Information Page" },
  },
];
```

Retrieving data in the component:

```typescript
this.route.data.subscribe((data) => {
  console.log(data.title);
});
```

Route data is useful for setting dynamic page titles or passing metadata.

---

This guide now includes additional topics on route reloading, animations, preserving state, resolve guards, and route data in Angular.

---

## **4. Advanced & Tricky Questions**

### 21. How do you implement role-based access control using Route Guards?

Role-based access control (RBAC) can be implemented in Angular using route guards such as `CanActivate`. The guard checks user roles before allowing access to a route.

**Example:**

```typescript
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data["role"];
    const userRole = this.authService.getUserRole();

    if (userRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(["/unauthorized"]);
      return false;
    }
  }
}
```

**Applying the guard to a route:**

```typescript
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { role: "admin" },
  },
];
```

---

### 22. How does Angular optimize routing performance in large applications?

Angular optimizes routing performance through techniques such as:

- **Lazy Loading**: Modules are loaded only when needed.
- **Preloading Strategies**: Selectively preloading modules for a better user experience.
- **OnPush Change Detection**: Minimizing unnecessary re-renders.
- **Efficient Route Guards**: Avoiding unnecessary computations.
- **Route Resolvers**: Loading data before activating a route.

---

### 23. What is the difference between lazy loading and preloading strategies?

- **Lazy Loading**: Loads feature modules only when the user navigates to them.
- **Preloading Strategies**: Loads selected modules in the background after the app has loaded, improving perceived performance.

**Example of PreloadingStrategy:**

```typescript
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data && route.data["preload"] ? load() : of(null);
  }
}
```

**Applying preloading strategy:**

```typescript
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

---

### 24. How do you customize route preloading in Angular?

You can create a custom preloading strategy based on route conditions such as user roles or network speed.

**Example:** Preloading only admin-related routes.

```typescript
export class AdminPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.["adminOnly"] ? load() : of(null);
  }
}
```

Applying it in `AppRoutingModule`:

```typescript
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: AdminPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

---

### 25. What happens when multiple guards are applied to a route?

When multiple guards (`CanActivate`, `CanDeactivate`, etc.) are applied, Angular executes them sequentially in the order they appear in the route configuration. If any guard returns `false`, navigation is canceled.

**Example:**

```typescript
const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
];
```

If `AuthGuard` fails, `RoleGuard` will not be executed, and navigation will be blocked.

---

### 26. How do you dynamically generate routes in Angular?

Dynamically generating routes is useful when you have a list of routes fetched from an API or a configuration file.

**Example:**

```typescript
const dynamicRoutes: Routes = [];

fetch("/api/routes")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((route) => {
      dynamicRoutes.push({ path: route.path, component: route.component });
    });
  });

@NgModule({
  imports: [RouterModule.forRoot(dynamicRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

For dynamically adding routes at runtime:

```typescript
this.router.config.push({ path: "new-path", component: NewComponent });
this.router.resetConfig(this.router.config);
```

---

### 27. How do you implement authentication and authorization in Angular Routing?

Authentication ensures users are logged in, while authorization checks their permissions.

**Example: Authentication Guard (`AuthGuard`)**

```typescript
@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
```

Applying it to routes:

```typescript
const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
```

---

### 28. How do you handle navigation errors in Angular?

You can handle navigation errors using the `Router` service’s `error` event or catching errors when using `navigate()`.

**Example:**

```typescript
this.router.navigate(["/unknown-route"]).catch((error) => {
  console.error("Navigation Error:", error);
});
```

Handling global errors:

```typescript
this.router.events.subscribe((event) => {
  if (event instanceof NavigationError) {
    console.error("Navigation failed:", event.error);
  }
});
```

---

### 29. How does `Router.navigateByUrl()` differ from `Router.navigate()`?

- **`Router.navigateByUrl(url: string)`**: Navigates directly to the specified URL as a string.
- **`Router.navigate(commands: any[], extras?: NavigationExtras)`**: Uses an array of commands to build the route dynamically.

**Example:**

```typescript
this.router.navigateByUrl("/dashboard"); // Direct URL navigation
this.router.navigate(["dashboard", "user", 1]); // Navigates to /dashboard/user/1
```

`navigate()` allows relative navigation:

```typescript
this.router.navigate(["profile"], { relativeTo: this.route });
```

---

### 30. Can you use Angular Routing without `RouterModule` in Standalone Components?

Yes, in Angular Standalone Components, routing is handled differently using `provideRouter()` instead of `RouterModule.forRoot()`.

**Example:**

```typescript
import { provideRouter, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
```

This approach is used for standalone applications that don’t rely on NgModules.
