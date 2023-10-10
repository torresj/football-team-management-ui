import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNoAssistanceComponent } from './confirm-no-assistance.component';

describe('ConfirmNoAssistanceComponent', () => {
  let component: ConfirmNoAssistanceComponent;
  let fixture: ComponentFixture<ConfirmNoAssistanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmNoAssistanceComponent]
    });
    fixture = TestBed.createComponent(ConfirmNoAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
