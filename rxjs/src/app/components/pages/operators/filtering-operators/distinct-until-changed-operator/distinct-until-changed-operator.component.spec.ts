import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistinctUntilChangedOperatorComponent } from './distinct-until-changed-operator.component';

describe('DistinctUntilChangedOperatorComponent', () => {
  let component: DistinctUntilChangedOperatorComponent;
  let fixture: ComponentFixture<DistinctUntilChangedOperatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistinctUntilChangedOperatorComponent]
    });
    fixture = TestBed.createComponent(DistinctUntilChangedOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
