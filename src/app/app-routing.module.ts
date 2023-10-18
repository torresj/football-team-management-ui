import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {authGuard} from "./guards/auth.guard";
import {NextMatchComponent} from "./components/next-match/next-match.component";
import {MyBalanceComponent} from "./components/my-balance/my-balance.component";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', canActivate: [authGuard], component: HomeComponent},
  {path: 'matches/next-match', canActivate: [authGuard], component: NextMatchComponent},
  {path: 'my-balance', canActivate: [authGuard], component: MyBalanceComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
