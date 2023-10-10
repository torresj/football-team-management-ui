import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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

    if (this.form.invalid) {
      return;
    }

    this.authService.login$(this.form.get('username')?.value, this.form.get('password')?.value).subscribe({
      next: value => {
        this.submitted = false;
        this.router.navigateByUrl('/');
      },
      error: err => {
        console.log(err)
        this.form.get('username')?.setErrors({'incorrect': true});
        this.form.get('password')?.setErrors({'incorrect': true});
      }
    });
  }
}
