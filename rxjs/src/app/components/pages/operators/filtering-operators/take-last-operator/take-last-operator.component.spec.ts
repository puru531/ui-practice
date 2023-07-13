import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeLastOperatorComponent } from './take-last-operator.component';

describe('TakeLastOperatorComponent', () => {
  let component: TakeLastOperatorComponent;
  let fixture: ComponentFixture<TakeLastOperatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakeLastOperatorComponent]
    });
    fixture = TestBed.createComponent(TakeLastOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
