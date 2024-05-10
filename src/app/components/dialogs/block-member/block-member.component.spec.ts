import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockMemberComponent } from './block-member.component';

describe('BlockMemberComponent', () => {
  let component: BlockMemberComponent;
  let fixture: ComponentFixture<BlockMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockMemberComponent]
    });
    fixture = TestBed.createComponent(BlockMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
