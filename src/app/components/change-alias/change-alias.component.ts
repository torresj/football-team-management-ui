import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthService } from 'src/app/services/auth.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-change-alias',
  templateUrl: './change-alias.component.html',
  styleUrls: ['./change-alias.component.css'],
})
export class ChangeAliasComponent implements OnInit {
  isLoading$ = new BehaviorSubject(false);
  submitted = false;

  constructor(
    private authService: AuthService,
    private memberService: MemberService,
    private formBuilder: FormBuilder
  ) {}

  form: FormGroup = new FormGroup({
    alias: new FormControl(this.authService.member$.value?.alias),
  });

  ngOnInit(): void {
    this.authService.member$.subscribe((member) => {
      this.form = this.formBuilder.group({
        alias: [member?.alias],
      });
    });
  }

  submit() {
    this.isLoading$.next(true);
    this.submitted = true;
    if (this.form.invalid) {
      this.isLoading$.next(false);
      return;
    } else {
      this.memberService.updateAlias$(this.form.get('alias')?.value).subscribe({
        next: () => {
          this.authService
            .refresh$()
            .subscribe(() => this.isLoading$.next(false));
        },
      });
    }
  }
}
