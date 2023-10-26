import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuredMemberComponent } from './injured-member.component';

describe('InjuredMemberComponent', () => {
  let component: InjuredMemberComponent;
  let fixture: ComponentFixture<InjuredMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InjuredMemberComponent]
    });
    fixture = TestBed.createComponent(InjuredMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
