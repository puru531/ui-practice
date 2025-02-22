import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgnoreElementsOperatorComponent } from './ignore-elements-operator.component';

describe('IgnoreElementsOperatorComponent', () => {
  let component: IgnoreElementsOperatorComponent;
  let fixture: ComponentFixture<IgnoreElementsOperatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IgnoreElementsOperatorComponent]
    });
    fixture = TestBed.createComponent(IgnoreElementsOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
