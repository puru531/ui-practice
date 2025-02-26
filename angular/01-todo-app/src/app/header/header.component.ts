import { Component } from '@angular/core';

@Component({
  // Component decorator is used to define a component and its metadata, such as the selector, template, and styles.
  selector: 'app-header', // The selector is a CSS selector that identifies this component in a template and triggers instantiation of the component.
  standalone: false, // The standalone property is a boolean that indicates whether the component is a standalone component or a part of a larger component.
  // standalone components are used to create reusable components that can be used in multiple places in an application.
  // We don't need to declare the component name in module declarations if the component is standalone.

  templateUrl: './header.component.html', // The templateUrl is the URL of an external file that contains the component's template.
  styleUrls: ['./header.component.css'], // The styleUrls is an array of URLs of external files that contain the component's styles.

  // NOTE : The templateUrl and styleUrls properties are used to load the template and styles from external files.
  // IF WE DO NOT WANT TO USE EXTERNAL FILES THEN WE CAN USE TEMPLATE AND STYLES PROPERTY AS SHOWN BELOW
  /*
  // The template is the HTML that defines the component's view.
  template: `
    <header>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">New Post</a></li>
        </ul>
      </nav>
    </header>
  `,
  // The styles property is an array of CSS styles that will be applied to the template.
  styles: [`
    header {
      width: 100%;
      background-color: #333;
      color: #fff;
    }
    nav ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
    }
    nav ul li {
      margin-right: 10px;
    }
    nav ul li a {
      color: #fff;
      text-decoration: none;
    }
  `]
  */
})
export class HeaderComponent {}
