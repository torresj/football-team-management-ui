import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../../entities/Role";
import {MemberService} from "../../../services/member.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent implements OnInit {

  submitted = false;

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    phone: new FormControl(''),
    role: new FormControl(Role.USER)
  });

  constructor(private dialogRef: MatDialogRef<CreateMemberComponent>,
              private formBuilder: FormBuilder,
              private memberService: MemberService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        role: [Role.USER, [Validators.required]]
      }
    );
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.memberService.create$(
      this.form.get('name')?.value,
      this.form.get('surname')?.value,
      this.form.get('phone')?.value,
      this.form.get('role')?.value).subscribe({
      next: () => this.dialogRef.close(),
      error: (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error.title == "Member already exists") {
          this.snackBar.open(`El usuario ${this.form.get('name')?.value} ${this.form.get('surname')?.value} ya existe`,
            "Ok", {
              duration: 5000
            });
        }
      }
    });

  }
}
