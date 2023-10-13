import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterOutlet} from "@angular/router";
import {LoginComponent} from './components/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './components/home/home.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {MatMenuModule} from "@angular/material/menu";
import { ConfirmAssistanceComponent } from './components/dialogs/confirm-assistance/confirm-assistance.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ConfirmNoAssistanceComponent } from './components/dialogs/confirm-no-assistance/confirm-no-assistance.component';
import { NextMatchComponent } from './components/next-match/next-match.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { PlayerListComponent } from './components/player-list/player-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import { PlayerItemComponent } from './components/player-list/player-item/player-item.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamItemComponent } from './components/team-list/team-item/team-item.component';

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
    TeamItemComponent
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
    MatListModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
