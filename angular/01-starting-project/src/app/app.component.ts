import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import { UserComponent } from "./user/user.component";
import {DUMMY_USERS} from "./dummy-users";
import {TasksComponent} from "./tasks/tasks.component";
// import {NgFor, NgIf} from "@angular/common"; // NgFor and NgIf are directives that are used in the template of AppComponent --> Older version

/**
 * In TypeScript and Angular, a decorator is a special kind of declaration that can be attached to a class, method, accessor, property, or parameter.
 * Decorators are used to modify or enhance the behavior of the target they are applied to.
 * They are prefixed with an @ symbol.
 * For example, in Angular, the @Component decorator is used to define a component and its metadata, such as the selector, template, and styles.
 */

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [HeaderComponent, UserComponent, TasksComponent, NgFor, NgIf], // NgFor, NgIf are needed in imports as they are used in the template of AppComponent
  imports: [HeaderComponent, UserComponent, TasksComponent], // this is needed to import the HeaderComponent in the AppComponent as HeaderComponent is used in the template of AppComponent and is a standalone component.
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUserId?: string;

  get selectedUser() {
    return this.users.find(user => user.id === this.selectedUserId)!; // ! is used to tell TypeScript that the property will be initialized later
  }

  onSelectUser(id: string) {
    console.log('User selected with id: ' + id);
    this.selectedUserId = id;
  }

}
