import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Role } from '../../../entities/Role';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberService } from '../../../services/member.service';
import Member from '../../../entities/Member';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css'],
})
export class EditMemberComponent implements OnInit {
  submitted = false;

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    phone: new FormControl(''),
    role: new FormControl(Role.USER),
    nCaptaincies: new FormControl(0),
  });

  constructor(
    private dialogRef: MatDialogRef<EditMemberComponent>,
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    @Inject(MAT_DIALOG_DATA) public data: Member,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.data.name, [Validators.required]],
      alias: [this.data.alias],
      surname: [this.data.surname, [Validators.required]],
      phone: [this.data.phone, [Validators.required]],
      role: [this.data.role, [Validators.required]],
      nCaptaincies: [this.data.nCaptaincies, [Validators.required]],
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.memberService
      .update$(
        this.data.id,
        this.form.get('name')?.value,
        this.form.get('alias')?.value,
        this.form.get('surname')?.value,
        this.form.get('phone')?.value,
        this.form.get('role')?.value,
        this.form.get('nCaptaincies')?.value
      )
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
