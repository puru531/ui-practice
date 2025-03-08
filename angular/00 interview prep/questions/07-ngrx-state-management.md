# Angular NgRx State Management Interview Questions

## 1. What is NgRx and why do we need it?
NgRx is a state management solution for Angular applications that provides:
- Predictable state container
- Unidirectional data flow
- Immutable state changes
- DevTools integration
- Performance benefits

## 2. Explain the core concepts of NgRx
- Store: Single source of truth
- Actions: Events that trigger state changes
- Reducers: Pure functions that specify state changes
- Selectors: Functions for selecting state slices
- Effects: Handle side effects

## 3. How do you define Actions in NgRx?
```typescript
// Simple action
export const loadUsers = createAction('[Users] Load');

// Action with payload
export const loadUsersSuccess = createAction(
  '[Users] Load Success',
  props<{ users: User[] }>()
);

// Action with error
export const loadUsersFailure = createAction(
  '[Users] Load Failure',
  props<{ error: any }>()
);
```

## 4. How do Reducers work in NgRx?
```typescript
export interface State {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  users: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(loadUsers, state => ({
    ...state,
    loading: true
  })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users
  }))
);
```

## 5. How do you implement Effects?
```typescript
@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() => this.userService.getUsers()
        .pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersFailure({ error })))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
```

## 6. How do Selectors work?
```typescript
// Feature selector
export const selectUserState = createFeatureSelector<State>('users');

// Derived selectors
export const selectAllUsers = createSelector(
  selectUserState,
  state => state.users
);

export const selectUserById = (id: string) => createSelector(
  selectAllUsers,
  users => users.find(user => user.id === id)
);
```

## 7. What is the Store and how to use it?
```typescript
@Component({
  template: `
    <ng-container *ngIf="users$ | async as users">
      <user-list [users]="users"></user-list>
    </ng-container>
  `
})
export class UsersComponent {
  users$ = this.store.select(selectAllUsers);

  constructor(private store: Store) {
    this.store.dispatch(loadUsers());
  }
}
```

## 8. How do you handle side effects in NgRx?
```typescript
@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(user => loginSuccess({ user })),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );

  // Effect without dispatching action
  logActions$ = createEffect(() =>
    this.actions$.pipe(
      tap(action => console.log(action))
    ),
    { dispatch: false }
  );
}
```

## 9. What is Entity State and how to use it?
```typescript
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<User> {
  selectedUserId: string | null;
  loading: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  selectedUserId: null,
  loading: false
});

export const reducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) =>
    adapter.setAll(users, { ...state, loading: false })
  )
);
```

## 10. What are Meta-reducers?
```typescript
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers: [debug]
    })
  ]
})
```

## 11. How do you test NgRx components?
```typescript
describe('UsersComponent', () => {
  let component: UsersComponent;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectAllUsers, value: [] }
          ]
        })
      ]
    });

    store = TestBed.inject(MockStore);
    component = TestBed.createComponent(UsersComponent).componentInstance;
  });

  it('should dispatch loadUsers on init', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(loadUsers());
  });
});
```

## 12. What is the difference between Select and Store.select?
```typescript
// Using Select decorator
export class UsersComponent {
  @Select(UserState.getUsers) users$: Observable<User[]>;
}

// Using store.select
export class UsersComponent {
  users$ = this.store.select(selectUsers);
  constructor(private store: Store) {}
}
```

## 13. How do you handle optimistic updates?
```typescript
@Injectable()
export class UserEffects {
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap(({ user }) =>
        this.userService.update(user).pipe(
          map(() => updateUserSuccess({ user })),
          catchError(error => {
            // Revert optimistic update
            this.store.dispatch(revertUpdate({ user }));
            return of(updateUserFailure({ error }));
          })
        )
      )
    )
  );
}
```

## 14. What is State composition?
```typescript
export interface AppState {
  users: UserState;
  auth: AuthState;
  settings: SettingsState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: fromUsers.reducer,
  auth: fromAuth.reducer,
  settings: fromSettings.reducer
};
```

## 15. How do you handle router state with NgRx?
```typescript
@NgModule({
  imports: [
    StoreRouterConnectingModule.forRoot(),
    RouterModule.forRoot(routes)
  ]
})
export class AppModule {}

// Access router state
export const selectRouter = createFeatureSelector<
  RouterReducerState<any>
>('router');

export const selectUrl = createSelector(
  selectRouter,
  (state: RouterReducerState<any>) => state.state.url
);
```

## 16. Tricky: How do you handle race conditions in Effects?
```typescript
search$ = createEffect(() =>
  this.actions$.pipe(
    ofType(searchUsers),
    debounceTime(300),
    switchMap(({ query }) =>
      this.userService.search(query).pipe(
        map(users => searchSuccess({ users })),
        catchError(error => of(searchFailure({ error })))
      )
    )
  )
);
```

## 17. What are custom selectors and how to use them?
```typescript
export const selectUsersWithRoles = createSelector(
  selectAllUsers,
  selectRoles,
  (users, roles) => users.map(user => ({
    ...user,
    role: roles.find(r => r.id === user.roleId)
  }))
);
```

## 18. How do you handle complex state updates?
```typescript
on(complexAction, (state, { payload }) => {
  const updated = { ...state };
  // Complex state manipulation
  payload.items.forEach(item => {
    const existing = updated.entities[item.id];
    if (existing) {
      updated.entities[item.id] = {
        ...existing,
        ...item,
        nestedData: {
          ...existing.nestedData,
          ...item.nestedData
        }
      };
    }
  });
  return updated;
});
```

## 19. How do you implement undo/redo functionality?
```typescript
export interface UndoableState<T> {
  past: T[];
  present: T;
  future: T[];
}

export const undo = createAction('[Undoable] Undo');
export const redo = createAction('[Undoable] Redo');

export function undoable<T>(reducer: ActionReducer<T>): ActionReducer<UndoableState<T>> {
  return (state, action) => {
    const { past, present, future } = state;

    switch (action.type) {
      case undo.type:
        return {
          past: past.slice(0, -1),
          present: past[past.length - 1],
          future: [present, ...future]
        };
      // ... handle redo and other cases
    }
  };
}
```

## 20. What are best practices for NgRx architecture?
- Keep actions granular and specific
- Use feature states
- Implement proper error handling
- Optimize selectors
- Follow naming conventions
- Use appropriate side effect operators
- Maintain immutability
- Proper testing strategy