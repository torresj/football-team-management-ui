import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  submitted = false;

  isLoading$ = new BehaviorSubject(false);

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
      }
    );
  }

  submit() {
    this.submitted = true;
    this.isLoading$.next(true);
    this.form.get('username')?.setErrors(null);
    this.form.get('password')?.setErrors(null);
    if (this.form.invalid) {
      this.isLoading$.next(false);
      return;
    }

    this.authService.login$(this.form.get('username')?.value, this.form.get('password')?.value).subscribe({
      next: value => {
        this.submitted = false;
        this.router.navigateByUrl('/');
        this.isLoading$.next(false);
      },
      error: err => {
        console.log(err)
        this.form.get('username')?.setErrors({'incorrect': true});
        this.form.get('password')?.setErrors({'incorrect': true});
        this.isLoading$.next(false);
      }
    });
  }
}
