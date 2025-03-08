# Angular's Http Client

- Angular's HttpClient is a built-in way to make HTTP requests in Angular. It is a wrapper around the browser's XMLHttpRequest object.
- Angular's HttpClient is a part of the @angular/common/http package.
- Angular's HttpClient is a part of the HttpClientModule.

```typescript
import { HttpClient } from "@angular/common/http";

export class MyService {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get("https://jsonplaceholder.typicode.com/posts")
      .subscribe((data) => {
        console.log(data);
      });
  }
}
```

HttpClient is not available in the browser by default. It is available as a separate module called HttpClientModule. You need to import HttpClientModule in your Angular module to use HttpClient.

For module based application:

`app.module.ts`

```typescript
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { provideHttpClient } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    // ... etc
  ],
  imports: [BrowserModule, FormsModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

For Standalone :

`main.ts`

```typescript
import { provideHttpClient } from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
}).error((err) => console.error(err));
```

## GET Request to Fetch Data

```typescript
import { HttpClient } from "@angular/common/http";

export class AppComponent {
  // constructor(private http: HttpClient) {}
  //OR
  private http = inject(HttpClient);

  ngOnInit() {
    this.http
      .get("https://jsonplaceholder.typicode.com/posts")
      .subscribe((data) => {
        console.log(data);
      });
  }
}
```

Getting complete response:

```typescript
this.http
  .get("https://jsonplaceholder.typicode.com/posts", { observe: "response" })
  .subscribe((response) => {
    console.log(response);
    console.log(response.headers.get("Content-Type"));
    console.log(response.body); // The response body with the data
  });
```

## Sending data to a backend

```typescript
this.http
  .put("https://jsonplaceholder.typicode.com/posts", {
    title: "Angular PUT Request",
  })
  .subscribe((data) => {
    console.log(data);
  });
```
## Sending DELETE Request

```typescript
this.http
  .delete("https://jsonplaceholder.typicode.com/posts/1")
  .subscribe((data) => {
    console.log(data);
  });
```

# Interceptors
Interceptors are a way to intercept HTTP requests and responses in Angular. They are used to modify the request or response before it is sent or received by the server.

**Create an interceptor:**

In Angular 18:

`main.ts`

```typescript
import { provideHttpClient, withInterceptors } from "@angular/common/http";

function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandler) {
  console.log("Request URL: ", req.url);
  // change the request
  const modifiedReq = req.clone({
    headers: req.headers.set("Authorization", 'Bearer my-token'),
  });
  return next(modifiedReq);
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), withInterceptors([loggingInterceptor])],
}).error((err) => console.error(err));
```

Older versions:



```typescript
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify the request
    const modifiedReq = req.clone({
      headers: req.headers.set("Authorization", "Bearer my-token"),
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedReq);
  }
}
```

**Register the interceptor:**

`app.module.ts`

```typescript
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MyInterceptor } from "./my-interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Intercept specific requests

```typescript
@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === "https://jsonplaceholder.typicode.com/posts") {
      // Modify the request
      const modifiedReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer my-token"),
      });

      // Pass the modified request to the next handler
      return next.handle(modifiedReq);
    }

    // Pass the original request to the next handler
    return next.handle(req);
  }
}
```

## Intercept specific responses

```typescript
@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log("Response status: ", event.status);
          console.log("Response body: ", event.body);
        }
      })
    );
  }
}
```

## Throw error from interceptor

```typescript
@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.error("Error occurred: ", error);
        return throwError(error);
      })
    );
  }
}
```