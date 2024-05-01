import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDeleteMovementComponent } from './team-delete-movement.component';

describe('TeamDeleteMovementComponent', () => {
  let component: TeamDeleteMovementComponent;
  let fixture: ComponentFixture<TeamDeleteMovementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDeleteMovementComponent]
    });
    fixture = TestBed.createComponent(TeamDeleteMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
