#  LAZY LOADING IN ANGULAR 

Lazy loading is a design pattern that loads modules only when they are needed. This can significantly improve the performance of your Angular application by reducing the initial load time.

## 1. Basic Lazy Loading Setup

In Angular, lazy loading is implemented using the `loadChildren` property in the route configuration. This property specifies the module to be loaded lazily.

`app-routing.module.ts`
```ts
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module')
      .then(m => m.CustomersModule)
  },
  {
    path: 'orders', 
    loadChildren: () => import('./orders/orders.module')
      .then(m => m.OrdersModule)
  }
];
```
In this example, the `customers` and `orders` modules are loaded lazily when the user navigates to the respective paths.

## 2. Feature Module Setup

To set up a feature module for lazy loading, you need to create a module and a routing module for the feature.

`customers.module.ts`
```ts
@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
```
The `CustomersModule` declares the `CustomersComponent` and imports the `CustomersRoutingModule`.

`customers-routing.module.ts`
```ts
const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
```
The `CustomersRoutingModule` defines the routes for the `CustomersModule`. The empty path (`''`) means that the `CustomersComponent` will be displayed when the user navigates to the `customers` path.

## 3. Preloading Strategies

Preloading strategies allow you to load modules in the background after the application has been initialized. This can improve the user experience by reducing the load time when navigating to lazily loaded modules.

`app-routing.module.ts`
```ts
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules // Eager preloading
    })
  ]
})
```
The `PreloadAllModules` strategy preloads all lazy-loaded modules after the application has been initialized.

**Custom Preloading Strategy**
```ts
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}
```
A custom preloading strategy can be implemented by creating a class that implements the `PreloadingStrategy` interface. In this example, the module is preloaded only if the route's data contains a `preload` property set to `true`.

## 4. Advanced Lazy Loading with Guards

Guards can be used to control access to lazily loaded modules. The `canLoad` guard prevents the module from being loaded if the guard returns `false`.

```ts
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard]
  }
];
```
In this example, the `AdminModule` is loaded lazily only if the `AuthGuard` allows it.

`auth.guard.ts`
```ts
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  canLoad(): boolean {
    return checkUserPermissions();
  }
}
```
The `AuthGuard` implements the `CanLoad` interface and checks if the user has the necessary permissions to load the module.

## 5. Lazy Loading with Parameters

You can also lazy load modules with route parameters.

```ts
const routes: Routes = [
  {
    path: 'products/:id',
    loadChildren: () => import('./product-details/product-details.module')
      .then(m => m.ProductDetailsModule)
  }
];
```
In this example, the `ProductDetailsModule` is loaded lazily when the user navigates to a product with a specific `id`.

## 6. Nested Lazy Loading

Nested lazy loading allows you to load child modules lazily within a parent module.

```ts
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    children: [
      {
        path: 'analytics',
        loadChildren: () => import('./analytics/analytics.module')
          .then(m => m.AnalyticsModule)
      }
    ]
  }
];
```
In this example, the `AnalyticsModule` is loaded lazily as a child of the `DashboardModule`.

## 7. Lazy Loading with Shared Modules

Shared modules can be used to share common components, directives, and pipes across multiple feature modules.

`shared.module.ts`
```ts
@NgModule({
  declarations: [CommonComponents],
  exports: [CommonComponents],
  imports: [CommonModule]
})
export class SharedModule { }
```
The `SharedModule` declares and exports common components that can be used in other modules.

`feature.module.ts`
```ts
@NgModule({
  imports: [
    SharedModule,
    FeatureRoutingModule
  ]
})
export class FeatureModule { }
```
The `FeatureModule` imports the `SharedModule` to use the common components.

## 8. Lazy Loading with State Management

State management libraries like NgRx can be used with lazy-loaded modules to manage the state of the application.

`feature.state.ts`
```ts
@State({
  name: 'feature',
  defaults: {
    items: []
  }
})
@Injectable()
export class FeatureState {
  @Action(LoadItems)
  loadItems(ctx: StateContext<FeatureStateModel>) {
    return this.service.getItems()
      .pipe(tap(items => ctx.setState({ items })));
  }
}
```
In this example, the `FeatureState` class manages the state of the `FeatureModule` using NgRx.

## 9. Dynamic Import with Conditions

You can dynamically import modules based on conditions, such as the environment.

```ts
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => {
      if (environment.production) {
        return import('./prod-feature/prod-feature.module')
          .then(m => m.ProdFeatureModule);
      } else {
        return import('./dev-feature/dev-feature.module')
          .then(m => m.DevFeatureModule);
      }
    }
  }
];
```
In this example, the `ProdFeatureModule` is loaded in production, and the `DevFeatureModule` is loaded in development.

## 10. Error Handling in Lazy Loading

You can handle errors that occur during the lazy loading of modules.

```ts
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module')
      .then(m => m.FeatureModule)
      .catch(err => {
        console.error('Error loading module:', err);
        return import('./error/error.module').then(m => m.ErrorModule);
      })
  }
];
```
In this example, if an error occurs while loading the `FeatureModule`, the `ErrorModule` is loaded instead.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

#  LAZY LOADING IN ANGULAR - v18
Two main ways of lazy loading in Angular:

## Route-based lazy loading: 
Only load the components that are needed for the current route.

Implementing route-based lazy loading: 

`app.routes.ts`:
```ts
const routes: Routes = [
  {path: 'home', component: HomeComponent}, // not right candidate for lazy loading, because it's the first page.
  {path: 'about', loadComponent: () => import('../about/about.component').then(mod => mod.AboutComponent)}, //lazy loading
  {path: 'product', component: ProductComponent},
];
```

Making all the children routes lazy-loaded:
```ts
const routes: Routes = [
  {path: 'product', component: ProductComponent, loadChildren: () => import('../product/product.routes').then(mod => mod.routes)},
];
```

### Lazy loading services:
```ts
@Injectable()
export class LazyService {
  constructor() {
    console.log('LazyService created');
  }
}
```
`app.routes.ts`:
```ts
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'product',
    component: ProductComponent,
    loadChildren: () => import('../product/product.routes').then(mod => mod.routes),
    providers: [LazyService] // since component is lazy-loaded, the service should be lazy-loaded as well.
    },
];
```

## Defer loading until Viewport visibility : [Angular v17+]
Load components that are not needed immediately, but might be needed later after user scrolls down to see the content.

`app.component.html`:
```html
<div>
  Some content
</div>

<!-- defer loading -->
@defer(on viewport) {
  <app-child></app-child>
} @placeholder { 
  <!--  placeholder is shown until the component is loaded -->
  <div>Loading...</div>



 <!-- other triggers : interaction - loads on click -->
  <!-- start fetching on hover itself -->
@defer(on viewport, prefetch on hover) {
  <app-child></app-child>
} @placeholder { 
  <!--  placeholder is shown until the component is loaded -->
  <div>Loading...</div>
}
```