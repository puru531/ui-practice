import { UserInteface } from '../types/user.interface';
import { UsersService } from './users.service';
import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';

describe('UsersService', () => {
  // setup for the UsersService
  let service: UsersService;
  const utilsServiceMock = {
    pluck: jest.fn(),
  };

  beforeEach(() => {
    // Configure the testing module with the UsersService --> TestBed is a testing utility provided by Angular
    // It allows us to create an Angular module for testing purposes

    // configureTestingModule is a method of TestBed that allows us to configure the testing module
    // We are providing the UsersService as a provider so that it can be injected into our
    TestBed.configureTestingModule({
      // providers: [UsersService, UtilsService], // not good in terms of test in isolation
      providers: [
        UsersService,
        { provide: UtilsService, useValue: utilsServiceMock }, // provide the mocked service
      ],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Never test plain value, but test the behavior
  describe('addUser', () => {
    it('should add a user', () => {
      const user: UserInteface = { id: '1', name: 'John Doe' };
      service.addUser(user);
      expect(service.users).toContain(user);
    });
  });

  describe('removeUser', () => {
    it('should remove a user by id', () => {
      service.users = [{ id: '1', name: 'John Doe' }];

      service.removeUser('1');
      expect(service.users).toEqual([]);
    });
    it('should remove a user by id', () => {
      const user1: UserInteface = { id: '1', name: 'John Doe' };
      const user2: UserInteface = { id: '2', name: 'Jane Doe' };
      service.addUser(user1);
      service.addUser(user2);

      service.removeUser(user1.id);

      expect(service.users).not.toContain(user1);
      expect(service.users).toContain(user2);
    });

    it('should not change the users array if the user id does not exist', () => {
      const initialUsers = [...service.users];
      service.removeUser('non-existent-id');
      expect(service.users).toEqual(initialUsers);
    });
  });

  describe('getUsernames', () => {
    it('should return list of usernames', () => {
      utilsServiceMock.pluck.mockReturnValue(['foo']);
      expect(service.getUsernames()).toEqual(['foo']);
    });
  });
});

describe('UsersService -- with spy', () => {
  let service: UsersService;
  let utilsService: UtilsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService, UtilsService],
    });
    service = TestBed.inject(UsersService);
    utilsService = TestBed.inject(UtilsService);
  });
 
  //With Spy, unlike mock we don't replace the function or its result.  We are spying for the function



  describe('getUsernames', () => {
    it('should return list of usernames', () => {
      jest.spyOn(utilsService, 'pluck');

      service.users = [{ id: '3', name: 'foo' }];
      service.getUsernames();
      expect(utilsService.pluck).toHaveBeenCalledWith(service.users, 'name');
    });
  });
});
