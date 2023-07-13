import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferTimeOperatorComponent } from './buffer-time-operator.component';

describe('BufferTimeOperatorComponent', () => {
  let component: BufferTimeOperatorComponent;
  let fixture: ComponentFixture<BufferTimeOperatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BufferTimeOperatorComponent]
    });
    fixture = TestBed.createComponent(BufferTimeOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
