import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MemberService } from '../../../services/member.service';
import Member from '../../../entities/Member';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../../../entities/Role';

@Component({
  selector: 'app-block-member',
  templateUrl: './block-member.component.html',
  styleUrls: ['./block-member.component.css'],
})
export class BlockMemberComponent {
  blocked: boolean;

  constructor(
    private dialogRef: MatDialogRef<BlockMemberComponent>,
    private memberService: MemberService,
    @Inject(MAT_DIALOG_DATA) public data: Member,
    private snackBar: MatSnackBar
  ) {
    this.blocked = data.blocked;
  }

  submit() {
    this.memberService
      .updateBlockedMember$(this.data.id, this.blocked)
      .subscribe({
        next: () => this.dialogRef.close(),
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.snackBar.open('El miembro no se ha podido actualizar', 'Ok', {
            duration: 5000,
          });
        },
      });
  }
}
