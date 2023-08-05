import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetryOperatorComponent } from './retry-operator.component';

describe('RetryOperatorComponent', () => {
  let component: RetryOperatorComponent;
  let fixture: ComponentFixture<RetryOperatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetryOperatorComponent]
    });
    fixture = TestBed.createComponent(RetryOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
