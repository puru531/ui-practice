import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitionComponent } from './partition.component';

describe('PartitionComponent', () => {
  let component: PartitionComponent;
  let fixture: ComponentFixture<PartitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartitionComponent]
    });
    fixture = TestBed.createComponent(PartitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
