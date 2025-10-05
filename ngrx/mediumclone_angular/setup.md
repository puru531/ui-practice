Node version : `v18.20.8`


Command to install angular cli locally (not globally) : 
```bash
npx -p @angular/cli@15 ng version
```
We have to use `npx -p @angular/cli@15` before every ng command in terminal.

#### Create a new project
```bash
npx -p @angular/cli@15 ng new mediumclone_angular
```

#### Start the application
```bash
npm run start
```

### Convert to standalone component based application.
Check `main.ts`:
```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {providers: []})
  .catch(err => console.error(err));
  ```

`app.component.ts`:
```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
}
```


## To run the backend
Download and install Docker Desktop application

Open the backend folder in terminal and run :
```bash
docker-compose build
```
After build is finished, run the server:
```bash
docker-compose up
```
The API should be available at `http://localhost:3000/api/articles`

To generate environment files:
```bash
npx -p @angular/cli@15 ng generate environments
```