import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxComponent } from './max.component';

describe('MaxComponent', () => {
  let component: MaxComponent;
  let fixture: ComponentFixture<MaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaxComponent]
    });
    fixture = TestBed.createComponent(MaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
