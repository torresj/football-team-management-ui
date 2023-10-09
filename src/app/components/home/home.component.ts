import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ReplaySubject} from "rxjs";
import Member from "../../entities/Member";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authService: AuthService) {}
}
