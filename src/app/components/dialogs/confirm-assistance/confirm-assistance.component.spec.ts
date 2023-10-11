import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAssistanceComponent } from './confirm-assistance.component';

describe('ConfirmAssistanceComponent', () => {
  let component: ConfirmAssistanceComponent;
  let fixture: ComponentFixture<ConfirmAssistanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmAssistanceComponent]
    });
    fixture = TestBed.createComponent(ConfirmAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
