import {Component, Inject} from '@angular/core';
import {MatchService} from "../../../services/match.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlayerMatchStatus} from "../../../entities/PlayerMatchStatus";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirm-assistance',
  templateUrl: './confirm-assistance.component.html',
  styleUrls: ['./confirm-assistance.component.css']
})
export class ConfirmAssistanceComponent {

  constructor(
    private matchService: MatchService,
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmAssistanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  addMemberToMatch() {
    this.matchService.addPlayerToMatch(this.data, PlayerMatchStatus.AVAILABLE)
      .subscribe({
        next: () => this.dialogRef.close(),
        error: err => {
          this.authService.logout();
          this.dialogRef.close()
          this.router.navigateByUrl('/login')
        }
      });
  }
}
