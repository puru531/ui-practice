import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {HeaderComponent} from "./app/header/header.component";

bootstrapApplication(AppComponent).catch((err) => console.error(err));
// bootstrapApplication(HeaderComponent) // this is needed to bootstrap the header component if we are using it in the index.html file
// but if we are using the header component in the app.component.html file then we don't need to bootstrap it here
// generally, we bootstrap the root component of the application in the main.ts file
// in this case, the root component is AppComponent


