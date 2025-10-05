/*
// -------------- Modules based application bootstrap --------------
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
*/

// -------------- Standalone component based application bootstrap --------------
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideStore } from '@ngrx/store';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes), provideStore()],
}).catch((err) => console.error(err));
