import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipWhileOperatorComponent } from './skip-while-operator.component';

describe('SkipWhileOperatorComponent', () => {
  let component: SkipWhileOperatorComponent;
  let fixture: ComponentFixture<SkipWhileOperatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkipWhileOperatorComponent]
    });
    fixture = TestBed.createComponent(SkipWhileOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
