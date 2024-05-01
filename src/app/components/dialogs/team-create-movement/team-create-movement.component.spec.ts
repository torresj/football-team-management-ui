import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCreateMovementComponent } from './team-create-movement.component';

describe('TeamCreateMovementComponent', () => {
  let component: TeamCreateMovementComponent;
  let fixture: ComponentFixture<TeamCreateMovementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamCreateMovementComponent]
    });
    fixture = TestBed.createComponent(TeamCreateMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
