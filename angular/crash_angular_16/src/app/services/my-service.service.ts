import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Injectable : The @Injectable() decorator is used to define a service class. The service class is used to provide functionality to components that are not directly related to the view.
 * If we do not use the @Injectable() decorator, the service will not be able to inject into the component.
 *
 * providedIn: 'root' : The providedIn property is used to provide the service at the root level. Means the service is available throughout the application.
 * If we do not provide the providedIn property, we need to import the service in the app.module.ts file.
 * Then the scope of the service will be limited to the module in which it is imported.
 */

@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  constructor(
    // Inject the HttpClient service in the constructor
    private http: HttpClient
  ) {}

  getMyName() {
    return 'My Name is Purushottam';
  }

  getPosts(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  // passing headers in the request
  getPostsByHeaders() {
    const headers = {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicHVydXNob3R0YW0ifQ.1y7Wz8I4I1jZ2o6qgqD2i7v7a1bqk5k1q3b7k5q1',
    };
    return this.http.get('https://jsonplaceholder.typicode.com/posts', {
      headers,
    });
  }
}
