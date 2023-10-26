import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../../../services/member.service";
import Member from "../../../entities/Member";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {Role} from "../../../entities/Role";

@Component({
  selector: 'app-injured-member',
  templateUrl: './injured-member.component.html',
  styleUrls: ['./injured-member.component.css']
})
export class InjuredMemberComponent {

  injured: boolean;

  constructor(private dialogRef: MatDialogRef<InjuredMemberComponent>,
              private memberService: MemberService,
              @Inject(MAT_DIALOG_DATA) public data: Member,
              private snackBar: MatSnackBar) {
    this.injured = data.injured;
  }

  submit() {
    this.memberService.updateInjuredMember$(this.data.id, this.injured).subscribe({
      next: () => this.dialogRef.close(),
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.snackBar.open("El miembro no se ha podido actualizar",
          "Ok", {
            duration: 5000
          });
      }
    });
  }
}
