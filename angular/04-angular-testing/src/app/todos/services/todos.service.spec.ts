import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FilterEnum } from '../types/filter.enum';
import { TodoInterface } from '../types/todo.interface';

describe('TodosService', () => {
  let service: TodosService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:3004/todos';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService],
    });

    service = TestBed.inject(TodosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('must create a service', () => {
    expect(service).toBeTruthy();
  });
  it('sets initial data', () => {
    expect(service.apiBaseUrl).toEqual(baseUrl);
    expect(service.todosSig()).toEqual([]);
    expect(service.filterSig()).toEqual(FilterEnum.all);
  });

  describe('changeFilter', () => {
    it('changes the filter', () => {
      service.changeFilter(FilterEnum.active);
      expect(service.filterSig()).toEqual(FilterEnum.active);
    });
  });

  describe('getTodos', () => {
    it('should return todos list', () => {
      const mockTodos: TodoInterface[] = [
        { id: '1', text: 'test1', isCompleted: false },
        { id: '2', text: 'test2', isCompleted: false },
      ];

      service.getTodos();
      const req = httpTestingController.expectOne(baseUrl);
      req.flush(mockTodos);
      expect(service.todosSig()).toEqual(mockTodos);
    });

    it('should not set value to todosSig if request fails', () => {
      service.getTodos();
      const req = httpTestingController.expectOne(baseUrl);
      req.flush('Server Error', { status: 401, statusText: 'Unauthorized' });
      expect(service.todosSig()).toEqual([]);
    });
  });

  describe('addTodo', () => {
    it('should add a todo item', () => {
      const mockTodos: TodoInterface = {
        id: '1',
        text: 'test2',
        isCompleted: false,
      };
      service.addTodo('test2');
      const req = httpTestingController.expectOne(baseUrl);
      req.flush(mockTodos);
      expect(service.todosSig()).toEqual([mockTodos]);
    });
  });
  describe('changeTodo', () => {
    it('should change a todo item', () => {
      const mockTodos: TodoInterface = {
        id: '1',
        text: 'test2',
        isCompleted: false,
      };
      service.todosSig.set([mockTodos]);
      service.changeTodo('1', 'test3');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({
        id: '1',
        text: 'test3',
        isCompleted: true,
      });
      expect(service.todosSig()).toEqual([
        {
          id: '1',
          text: 'test3',
          isCompleted: true,
        },
      ]);
    });
  });
  describe('removeTodo', () => {
    it('should remove a todo item', () => {
      const mockTodos: TodoInterface[] = [
        {
          id: '1',
          text: 'test1',
          isCompleted: false,
        },
        {
          id: '2',
          text: 'test2',
          isCompleted: false,
        },
      ];
      service.todosSig.set(mockTodos);
      service.removeTodo('1');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({});
      expect(service.todosSig()).toEqual([
        {
          id: '2',
          text: 'test2',
          isCompleted: false,
        },
      ]);
    });
  });

  describe('toggleTodo', ()=> {
    it('should remove a todo item', () => {
      const mockTodos: TodoInterface[] = [
        {
          id: '1',
          text: 'test1',
          isCompleted: false,
        }
      ];
      service.todosSig.set(mockTodos);
      service.toggleTodo('1');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({
          id: '1',
          text: 'test1',
          isCompleted: true,
        });
      expect(service.todosSig()).toEqual([
        {
          id: '1',
          text: 'test1',
          isCompleted: true,
        }
      ]);
    });
  });

  // multiple API calls
  describe('toggleAll', ()=> {
    it('should remove a todo item', () => {
      const mockTodos: TodoInterface[] = [
        {
          id: '1',
          text: 'test1',
          isCompleted: false,
        },
        {
          id: '2',
          text: 'test2',
          isCompleted: false,
        }
      ];
      service.todosSig.set(mockTodos);
      service.toggleAll(true);
      // const req = httpTestingController.expectOne(`${baseUrl}/1`);

      const reqs = httpTestingController.match(request => request.url.includes(baseUrl))

      reqs[0].flush({
          id: '1',
          text: 'test1',
          isCompleted: true,
        });
      reqs[1].flush(
        {
          id: '2',
          text: 'test2',
          isCompleted: true,
        });
      expect(service.todosSig()).toEqual([
        {
          id: '1',
          text: 'test1',
          isCompleted: true,
        },
        
        {
          id: '2',
          text: 'test2',
          isCompleted: true,
        }
      ]);
    });
  });

});
