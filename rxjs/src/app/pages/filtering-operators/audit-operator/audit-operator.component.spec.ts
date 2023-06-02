import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditOperatorComponent } from './audit-operator.component';

describe('AuditOperatorComponent', () => {
  let component: AuditOperatorComponent;
  let fixture: ComponentFixture<AuditOperatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditOperatorComponent]
    });
    fixture = TestBed.createComponent(AuditOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
