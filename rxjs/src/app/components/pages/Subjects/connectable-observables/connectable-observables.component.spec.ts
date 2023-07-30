import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectableObservablesComponent } from './connectable-observables.component';

describe('ConnectableObservablesComponent', () => {
  let component: ConnectableObservablesComponent;
  let fixture: ComponentFixture<ConnectableObservablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectableObservablesComponent]
    });
    fixture = TestBed.createComponent(ConnectableObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
