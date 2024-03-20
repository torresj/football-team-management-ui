import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAliasComponent } from './change-alias.component';

describe('ChangeAliasComponent', () => {
  let component: ChangeAliasComponent;
  let fixture: ComponentFixture<ChangeAliasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeAliasComponent]
    });
    fixture = TestBed.createComponent(ChangeAliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
