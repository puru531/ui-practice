import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinComponent } from './min.component';

describe('MinComponent', () => {
  let component: MinComponent;
  let fixture: ComponentFixture<MinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinComponent]
    });
    fixture = TestBed.createComponent(MinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
