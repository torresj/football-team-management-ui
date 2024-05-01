import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { NextMatchComponent } from './components/matches/next-match/next-match.component';
import { MyBalanceComponent } from './components/my-balance/my-balance.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MatchesComponent } from './components/matches/matches.component';
import { MembersComponent } from './components/members/members.component';
import { RulesComponent } from './components/rules/rules.component';
import { BalanceComponent } from './components/balance/balance.component';
import { TotalBalanceComponent } from './components/total-balance/total-balance.component';
import { ChangeAliasComponent } from './components/change-alias/change-alias.component';
import { TeamBalanceComponent } from './components/team-balance/team-balance.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [authGuard], component: HomeComponent },
  { path: 'members', canActivate: [authGuard], component: MembersComponent },
  { path: 'matches', canActivate: [authGuard], component: MatchesComponent },
  {
    path: 'matches/next-match',
    canActivate: [authGuard],
    component: NextMatchComponent,
  },
  {
    path: 'my-balance',
    canActivate: [authGuard],
    component: MyBalanceComponent,
  },
  {
    path: 'change-password',
    canActivate: [authGuard],
    component: ChangePasswordComponent,
  },
  {
    path: 'change-alias',
    canActivate: [authGuard],
    component: ChangeAliasComponent,
  },
  { path: 'rules', canActivate: [authGuard], component: RulesComponent },
  { path: 'movements', canActivate: [authGuard], component: BalanceComponent },
  {
    path: 'team-movements',
    canActivate: [authGuard],
    component: TeamBalanceComponent,
  },
  {
    path: 'total-balance',
    canActivate: [authGuard],
    component: TotalBalanceComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
