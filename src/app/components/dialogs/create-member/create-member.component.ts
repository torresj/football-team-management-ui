import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../../entities/Role";

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent implements OnInit{

  submitted = false;

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    phone: new FormControl(''),
    role: new FormControl(Role.USER)
  });
  constructor(private dialogRef: MatDialogRef<CreateMemberComponent>,
              private formBuilder: FormBuilder) {
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

  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  }
}
