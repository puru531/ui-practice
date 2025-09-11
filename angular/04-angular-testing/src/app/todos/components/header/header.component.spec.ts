import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodosService } from '../../services/todos.service';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let todosService: TodosService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('renders the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a todo item', () => {
    //Creates a mock function similar to jest.fn but also tracks calls to object[methodName]

    // Note: By default, jest.spyOn also calls the spied method. This is different behavior from most other test libraries.
    jest.spyOn(todosService, 'addTodo').mockImplementation(() => {});
    const input = fixture.debugElement.query(
      By.css('[data-testid="newTodoInput"]')
    );
    input.nativeElement.value = 'New Todo';
    input.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' })
    );
    expect(todosService.addTodo).toHaveBeenCalledWith('New Todo');
    expect(component.text).toBe('');
  });
});
