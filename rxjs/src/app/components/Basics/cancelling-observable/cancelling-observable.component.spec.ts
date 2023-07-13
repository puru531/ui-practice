import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellingObservableComponent } from './cancelling-observable.component';

describe('CancellingObservableComponent', () => {
  let component: CancellingObservableComponent;
  let fixture: ComponentFixture<CancellingObservableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancellingObservableComponent]
    });
    fixture = TestBed.createComponent(CancellingObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
