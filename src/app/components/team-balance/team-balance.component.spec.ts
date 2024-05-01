import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBalanceComponent } from './team-balance.component';

describe('TeamBalanceComponent', () => {
  let component: TeamBalanceComponent;
  let fixture: ComponentFixture<TeamBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamBalanceComponent]
    });
    fixture = TestBed.createComponent(TeamBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
