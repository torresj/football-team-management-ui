import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {BehaviorSubject} from "rxjs";
import Member from "./entities/Member";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  member$: BehaviorSubject<Member | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.member$ = authService.member$;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
