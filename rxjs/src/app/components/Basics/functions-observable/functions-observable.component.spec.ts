import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionsObservableComponent } from './functions-observable.component';

describe('FunctionsObservableComponent', () => {
  let component: FunctionsObservableComponent;
  let fixture: ComponentFixture<FunctionsObservableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionsObservableComponent]
    });
    fixture = TestBed.createComponent(FunctionsObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
