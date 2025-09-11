import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { TodosService } from '../../services/todos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';
import { SimpleChange } from '@angular/core';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todosService: TodosService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    component.todo = { id: '1', text: 'Test Todo', isCompleted: false };
    component.isEditing = false;
    fixture.detectChanges();
  });

  it('should render the component', () => {
    expect(component).toBeTruthy();
  });

  it('has correct initial state', () => {
    const todo = fixture.debugElement.query(By.css('[data-testid="todo"]'));
    const label = fixture.debugElement.query(By.css('[data-testid="label"]'));
    const edit = fixture.debugElement.query(By.css('[data-testid="edit"]'));
    expect(todo.classes['completed']).not.toBeDefined();
    expect(todo.classes['editing']).not.toBeDefined();
    expect(edit).toBeFalsy();
    expect(label.nativeElement.textContent).toEqual('Test Todo');
  });
  it('should toggle a todo', () => {
    jest.spyOn(todosService, 'toggleTodo').mockImplementation(() => {});
    const toggle = fixture.debugElement.query(By.css('[data-testid="toggle"]'));
    toggle.nativeElement.click();
    expect(todosService.toggleTodo).toHaveBeenCalledWith('1');
  });
  it('should remove a todo', () => {
    jest.spyOn(todosService, 'removeTodo').mockImplementation(() => {});
    const destroy = fixture.debugElement.query(
      By.css('[data-testid="destroy"]')
    );
    destroy.nativeElement.click();
    expect(todosService.removeTodo).toHaveBeenCalledWith('1');
  });

  it('should activate edit mode', () => {
    const label = fixture.debugElement.query(By.css('[data-testid="label"]'));
    let clickedTodoId: string | null | undefined;
    component.setEditingId.pipe(first()).subscribe((id) => {
      clickedTodoId = id;
    });
    label.triggerEventHandler('dblclick');
    expect(clickedTodoId).toEqual('1');
  });

  it('should change a todo', () => {
    jest.spyOn(todosService, 'changeTodo').mockImplementation(() => {});
    component.isEditing = true;
    fixture.detectChanges();
    const edit = fixture.debugElement.query(By.css('[data-testid="edit"]'));
    edit.nativeElement.value = 'test change';
    edit.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' })
    );
    expect(todosService.changeTodo).toHaveBeenCalledWith('1', 'test change');
  });

  // asynchronous actions -> testing setTimeout
  it('should focus after editing activation', fakeAsync(() => {
    // fakeAsync does not work with Http calls, it is useful for setTimeout, setInterval, etc..
    component.isEditing = true;
    //after manually changing the value of variables, ngOnChanges will not be triggered, so triggering it manually.
    component.ngOnChanges({ isEditing: new SimpleChange(false, true, false) });
    fixture.detectChanges();
    tick(); // skipping timer provided in setTimeout. default argument is 0. so passing 0 is optional. but if setTimeout is having 1000 we have to pass it in tick -> tick(1000)
    const edit = fixture.debugElement.query(By.css(':focus'));
    expect(edit).toBeTruthy();
  }));
});
