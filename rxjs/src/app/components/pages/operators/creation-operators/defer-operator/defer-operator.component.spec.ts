import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferOperatorComponent } from './defer-operator.component';

describe('DeferOperatorComponent', () => {
  let component: DeferOperatorComponent;
  let fixture: ComponentFixture<DeferOperatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeferOperatorComponent]
    });
    fixture = TestBed.createComponent(DeferOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
