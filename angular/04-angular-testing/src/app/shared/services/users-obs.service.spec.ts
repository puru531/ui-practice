import { TestBed } from '@angular/core/testing';
import { UsersObservableService } from './users-obs.service';
import { UserInteface } from '../types/user.interface';

describe('UsersObservableService', () => {
  let service: UsersObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersObservableService],
    });

    service = TestBed.inject(UsersObservableService);
  });

  it('service should be created', () => {
    expect(service).toBeDefined();
  });

  describe('addUser', () => {
    it('should add user to the users$ observable', () => {
      const user: UserInteface = { id: '1', name: 'John Doe' };
      service.addUser(user);
      expect(service.users$.getValue()).toEqual([user]);
    });
  });

  describe('removeUser', () => {
    it('should remove user from the users$ observable', () => {
      const user: UserInteface = { id: '1', name: 'John Doe' };
      service.users$.next([user]);
      service.removeUser('1');
      expect(service.users$.getValue()).toEqual([]);
    });
  });
});
