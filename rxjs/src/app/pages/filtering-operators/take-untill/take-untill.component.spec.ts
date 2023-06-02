import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeUntillComponent } from './take-untill.component';

describe('TakeUntillComponent', () => {
  let component: TakeUntillComponent;
  let fixture: ComponentFixture<TakeUntillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakeUntillComponent]
    });
    fixture = TestBed.createComponent(TakeUntillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
