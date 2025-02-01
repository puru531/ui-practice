import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MyServiceService } from 'src/app/services/my-service.service';

@Component({
  selector: 'app-http-api',
  templateUrl: './http-api.component.html',
  styleUrls: ['./http-api.component.scss'],
})
export class HttpApiComponent {
  /**
   * The HttpClient service is an Angular module that allows your application to communicate with a backend service over the HTTP protocol.
   *
   * To use the HttpClient service in your application, you need to import the HttpClientModule in the root module of the application (AppModule). Add HttpClientModule to the imports array of the @NgModule decorator in the AppModule.
   * After importing the HttpClientModule, you can inject the HttpClient service in your application to make HTTP requests.
   * The HttpClient service provides methods to perform HTTP requests such as GET, POST, PUT, DELETE, etc.
   * The HttpClient service returns an Observable object when you make an HTTP request. You can subscribe to the Observable object to get the response from the server.
   * The HttpClient service is available in the @angular/common/http package.
   *
   */

  // Define a property to store the posts data
  posts: any;

  constructor(private http: HttpClient, private myService: MyServiceService) {}

  // call the getPosts() method when the component is initialized
  ngOnInit() {
    // this.myService.getPosts().subscribe(
    //   // The subscribe() method is used to subscribe to the Observable object and get the response from the server
    //   (response) => {
    //     // Handle the response from the server
    //     this.posts = response;
    //   },
    //   (error) => {
    //     // Handle errors that occur during the HTTP request
    //     console.error(error);
    //   }
    // );

    /**
     * Above code shows deprecated way of subscribing to the Observable object.
     *
     * In order to avoid that warning, we can use next() and error() methods of the subscribe() method.
     *
     */

    // Example of using next() and error() methods of the subscribe() method
    this.myService.getPosts().subscribe({
      next: (response) => {
        // Handle the response from the server
        this.posts = response;
      },
      error: (error) => {
        // Handle errors that occur during the HTTP request
        console.error(error);
      },
    });
  }
}
