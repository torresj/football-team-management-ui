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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConfirmAssistanceComponent,
    ConfirmNoAssistanceComponent,
    NextMatchComponent
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
        MatProgressSpinnerModule
    ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
