import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSubjectsComponent } from './about-subjects.component';

describe('AboutSubjectsComponent', () => {
  let component: AboutSubjectsComponent;
  let fixture: ComponentFixture<AboutSubjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutSubjectsComponent]
    });
    fixture = TestBed.createComponent(AboutSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
