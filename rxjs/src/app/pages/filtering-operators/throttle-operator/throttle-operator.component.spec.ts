import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThrottleOperatorComponent } from './throttle-operator.component';

describe('ThrottleOperatorComponent', () => {
  let component: ThrottleOperatorComponent;
  let fixture: ComponentFixture<ThrottleOperatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThrottleOperatorComponent]
    });
    fixture = TestBed.createComponent(ThrottleOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
