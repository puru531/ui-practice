import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    // lazy load auth
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.loginRoutes),
  },
];
