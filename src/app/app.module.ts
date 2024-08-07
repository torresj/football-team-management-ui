import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmAssistanceComponent } from './components/dialogs/confirm-assistance/confirm-assistance.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmNoAssistanceComponent } from './components/dialogs/confirm-no-assistance/confirm-no-assistance.component';
import { NextMatchComponent } from './components/matches/next-match/next-match.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PlayerItemComponent } from './components/player-list/player-item/player-item.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamItemComponent } from './components/team-list/team-item/team-item.component';
import { AddPlayerToTeamComponent } from './components/dialogs/add-player-to-team/add-player-to-team.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CreateMatchComponent } from './components/dialogs/create-match/create-match.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MyBalanceComponent } from './components/my-balance/my-balance.component';
import { MatTableModule } from '@angular/material/table';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MatchComponent } from './components/matches/match/match.component';
import { MatchesComponent } from './components/matches/matches.component';
import { MembersComponent } from './components/members/members.component';
import { CreateMemberComponent } from './components/dialogs/create-member/create-member.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteMemberComponent } from './components/dialogs/delete-member/delete-member.component';
import { EditMemberComponent } from './components/dialogs/edit-member/edit-member.component';
import { InjuredMemberComponent } from './components/dialogs/injured-member/injured-member.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { RulesComponent } from './components/rules/rules.component';
import { BalanceComponent } from './components/balance/balance.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateMovementComponent } from './components/dialogs/create-movement/create-movement.component';
import { DeleteMovementComponent } from './components/dialogs/delete-movement/delete-movement.component';
import { TotalBalanceComponent } from './components/total-balance/total-balance.component';
import { NgOptimizedImage } from '@angular/common';
import { BalanceAlertComponent } from './components/dialogs/balance-alert/balance-alert.component';
import { ChangeAliasComponent } from './components/change-alias/change-alias.component';
import { TeamBalanceComponent } from './components/team-balance/team-balance.component';
import { TeamCreateMovementComponent } from './components/dialogs/team-create-movement/team-create-movement.component';
import { TeamDeleteMovementComponent } from './components/dialogs/team-delete-movement/team-delete-movement.component';
import { BlockMemberComponent } from './components/dialogs/block-member/block-member.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConfirmAssistanceComponent,
    ConfirmNoAssistanceComponent,
    NextMatchComponent,
    PlayerListComponent,
    PlayerItemComponent,
    TeamListComponent,
    TeamItemComponent,
    AddPlayerToTeamComponent,
    CreateMatchComponent,
    MyBalanceComponent,
    ChangePasswordComponent,
    MatchComponent,
    MatchesComponent,
    MembersComponent,
    CreateMemberComponent,
    DeleteMemberComponent,
    EditMemberComponent,
    InjuredMemberComponent,
    RulesComponent,
    BalanceComponent,
    CreateMovementComponent,
    DeleteMovementComponent,
    TotalBalanceComponent,
    BalanceAlertComponent,
    ChangeAliasComponent,
    TeamBalanceComponent,
    TeamCreateMovementComponent,
    TeamDeleteMovementComponent,
    BlockMemberComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    AppRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatPaginatorModule,
    NgOptimizedImage,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
