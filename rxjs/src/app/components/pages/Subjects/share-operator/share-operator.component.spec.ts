import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareOperatorComponent } from './share-operator.component';

describe('ShareOperatorComponent', () => {
  let component: ShareOperatorComponent;
  let fixture: ComponentFixture<ShareOperatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareOperatorComponent]
    });
    fixture = TestBed.createComponent(ShareOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
