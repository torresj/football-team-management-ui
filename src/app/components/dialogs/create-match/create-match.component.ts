import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatchService } from '../../../services/match.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css'],
})
export class CreateMatchComponent {
  dateSelected = new Date();

  constructor(
    private authService: AuthService,
    private router: Router,
    private matchService: MatchService,
    private dialogRef: MatDialogRef<CreateMatchComponent>,
    private _adapter: DateAdapter<any>
  ) {
    this._adapter.setLocale('es');
  }

  createMatch() {
    this.matchService.createMatch$(this.dateSelected).subscribe({
      next: () => this.dialogRef.close(),
      error: (err) => {
        this.authService.logout();
        this.dialogRef.close();
        this.router.navigateByUrl('/login');
      },
    });
  }
}
