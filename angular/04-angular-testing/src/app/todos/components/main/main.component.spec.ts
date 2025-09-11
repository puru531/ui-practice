import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { TodosService } from '../../services/todos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodoComponent } from '../todo/todo.component';
import { By } from '@angular/platform-browser';

/*
    What is Shallow Component Testing?
    Shallow testing means testing a component in isolation - focusing only on the component itself without rendering or testing its child components.

    The Problem (Without Shallow Testing)
    When you test a component that has child components:
    Without shallow testing, your test would:

    ❌ Render ALL child components
    ❌ Execute child component logic
    ❌ Test child component functionality
    ❌ Make the test slow and complex
    ❌ Create dependencies on child component implementations

    The Solution: Shallow Testing
    With shallow testing, you:

    ✅ Test ONLY the MainComponent logic
    ✅ Mock or stub child components
    ✅ Keep tests fast and focused
    ✅ Avoid testing child component functionality (they have their own tests)

*/

// shallow testing
@Component({
  selector: 'app-todos-todo',
  template: '',
  standalone: true,
})
class TodoComponentMock {
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let todosService: TodosService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainComponent, HttpClientTestingModule],
    })
      .overrideComponent(MainComponent, {
        // replacing real todo component with mock component
        remove: { imports: [TodoComponent] },
        add: { imports: [TodoComponentMock] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('should render the component', () => {
    expect(component).toBeTruthy();
  });

  describe('component visibility', () => {
    it('should be hidden without todos', () => {
      const main = fixture.debugElement.query(By.css('[data-testid="main"]'));
      expect(main.classes['hidden']).toEqual(true);
    });
    it('should be visible with todos', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);
      fixture.detectChanges();
      const main = fixture.debugElement.query(By.css('[data-testid="main"]'));
      expect(main.classes['hidden']).not.toBeDefined();
    });
  });
  describe('toggle-all', () => {
    it('should highlight toggle all checkbox', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);
      fixture.detectChanges();
      const checkbox = fixture.debugElement.query(
        By.css('[data-testid="toggleAll"]')
      );
      expect(checkbox.nativeElement.checked).toEqual(true);
    });
    it('should toggle all todos', () => {
      jest.spyOn(todosService, 'toggleAll').mockImplementation(() => {});
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);
      fixture.detectChanges();
      const checkbox = fixture.debugElement.query(
        By.css('[data-testid="toggleAll"]')
      );
      //   checkbox.triggerEventHandler('change', {
      //     target: { checked: true },
      //   });

      // or
      checkbox.nativeElement.click();
      expect(todosService.toggleAll).toHaveBeenCalledWith(false);
    });
  });
  describe('list of todos', () => {
    it('should render list of todos', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);
      fixture.detectChanges();
      const todos = fixture.debugElement.queryAll(
        By.css('[data-testid="todo"]')
      );
      expect(todos.length).toEqual(1);
      expect(todos[0].componentInstance.todo).toEqual({
        id: '1',
        text: 'foo',
        isCompleted: true,
      });
      expect(todos[0].componentInstance.isEditing).toEqual(false);
    });
    it('should change editingId', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);
      fixture.detectChanges();
      const todos = fixture.debugElement.queryAll(
        By.css('[data-testid="todo"]')
      );
      todos[0].componentInstance.setEditingId.emit('1');
      expect(component.editingId).toEqual('1');
    });
  });
});
