import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  /**
   * Services are used to provide functionality to components that are not directly related to the view.
   * Services are used to share data between components.
   * Services are used to communicate with the server.
   * Services are used to store data that can be shared between components.
   *
   */
  /**
   * Dependency Injection
   * In Angular, dependency injection is used to inject the services into the components.
   *
   * To use a service in a component, you need to import the service and inject it into the component's constructor.
   *
   * Angular provides the following ways to inject a service into a component:
   *
   * 1. Constructor Injection
   * 2. Property Injection
   * 3. Method Injection
   *
   * 1. Constructor Injection - The most common way to inject a service into a component is through the constructor.
   * Example:
   * constructor(private myService: MyService) { }
   *
   * 2. Property Injection - In this method, you can directly inject the service into the component's property.
   * Example:
   * @Inject(MyService) myService: MyService;
   *
   * 3. Method Injection - In this method, you can inject the service into the component's method.
   * Example:
   * myMethod(@Inject(MyService) myService: MyService) { }
   *
   * Difference between Constructor Injection, Property Injection and Method Injection
   *
   * Constructor Injection: The service is injected into the component's constructor. It is the most common way to inject a service into a component.
   * Property Injection: The service is injected into the component's property. It is not recommended to use this method because it makes the service public.
   * Method Injection: The service is injected into the component's method. It is not recommended to use this method because it makes the service public.
   */
  /**
   * Creating a Service
   * we can create a service using the Angular CLI command ng generate service.
   * command: ng generate service my-service
   * or ng g s my-service
   * */
}
