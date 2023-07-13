import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferWhenOperatorComponent } from './buffer-when-operator.component';

describe('BufferWhenOperatorComponent', () => {
  let component: BufferWhenOperatorComponent;
  let fixture: ComponentFixture<BufferWhenOperatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BufferWhenOperatorComponent]
    });
    fixture = TestBed.createComponent(BufferWhenOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
