import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { Newtask } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input() userId!: string;
  @Output() close = new EventEmitter<void>();
  // @Output() add = new EventEmitter<Newtask>();
  // enteredTitle = signal('');
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  private taskService = inject(TasksService);

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    // this.add.emit({
    //   title: this.enteredTitle,
    //   summary: this.enteredSummary,
    //   date: this.enteredDate,
    // });
    this.taskService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDate,
      },
      this.userId
    );
    this.close.emit();
  }
}

/*
* In Angular, directives are classes that add additional behavior to elements in your Angular applications. They can be used to manipulate the DOM, change the appearance or behavior of elements, and create reusable components. There are three types of directives in Angular:

1. **Component Directives**: These are the most common directives and are used to create components. They have a template, styles, and logic.

2. **Structural Directives**: These directives change the DOM layout by adding or removing elements. Examples include `*ngIf`, `*ngFor`, and `*ngSwitch`.

3. **Attribute Directives**: These directives change the appearance or behavior of an element, component, or another directive. Examples include `ngClass`, `ngStyle`, and custom attribute directives.

In this code, `FormsModule` is imported to use Angular's built-in directives for handling forms, such as `ngModel` for two-way data binding.
* */
