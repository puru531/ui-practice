import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferToggleOperatorComponent } from './buffer-toggle-operator.component';

describe('BufferToggleOperatorComponent', () => {
  let component: BufferToggleOperatorComponent;
  let fixture: ComponentFixture<BufferToggleOperatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BufferToggleOperatorComponent]
    });
    fixture = TestBed.createComponent(BufferToggleOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
