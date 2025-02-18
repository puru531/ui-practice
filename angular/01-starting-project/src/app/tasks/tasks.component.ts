import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { type Newtask } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name?: string;

  // private tasksService = new TasksService();
  // this will create a new instance of the service
  // which is not what we want
  // we want to use the same instance of the service
  // that is provided by Angular
  constructor(private tasksService: TasksService) {}
  // this process is known as Dependency Injection.
  // You tell Angular which type of value you need and Angular created it and provides it as an argument

  isAddingTask = false;

  get selectedUserTask() {
    return this.tasksService.getUserTasks(this.userId);
  }

  onCompleteTask($event: string) {
    this.tasksService.removeTask($event);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }

  // onAddTask(task: Newtask) {
  //   this.tasksService.addTask(task, this.userId);
  //   this.isAddingTask = false;
  // }
}
