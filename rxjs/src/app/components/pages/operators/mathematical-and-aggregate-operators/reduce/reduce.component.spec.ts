import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduceComponent } from './reduce.component';

describe('ReduceComponent', () => {
  let component: ReduceComponent;
  let fixture: ComponentFixture<ReduceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReduceComponent]
    });
    fixture = TestBed.createComponent(ReduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
