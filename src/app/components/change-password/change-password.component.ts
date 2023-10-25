import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {MemberService} from "../../services/member.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({
    newPassword: new FormControl(''),
    confirmNewPassword: new FormControl('')
  });

  isLoading$ = new BehaviorSubject(false);
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private authService: AuthService,
              private router: Router) {
  }

  submit() {
    this.isLoading$.next(true);
    this.submitted = true;
    if (this.form.invalid) {
      this.isLoading$.next(false);
      return
    } else {
      this.memberService.updatePassword$(this.form.get('newPassword')?.value)
        .subscribe({
          next:()=>{
            this.authService.logout();
            this.router.navigateByUrl('/login')
            this.isLoading$.next(false);
          }
        });
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.ConfirmedValidator('newPassword', 'confirmNewPassword')
      }
    );
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
