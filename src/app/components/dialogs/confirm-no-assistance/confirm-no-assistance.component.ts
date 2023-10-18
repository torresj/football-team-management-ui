import {Component, Inject} from '@angular/core';
import {MatchService} from "../../../services/match.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlayerMatchStatus} from "../../../entities/PlayerMatchStatus";

@Component({
  selector: 'app-confirm-no-assistance',
  templateUrl: './confirm-no-assistance.component.html',
  styleUrls: ['./confirm-no-assistance.component.css']
})
export class ConfirmNoAssistanceComponent {
  constructor(
    private matchService: MatchService,
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmNoAssistanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  addMemberToMatch() {
    this.matchService.addPlayerToMatch$(this.data, PlayerMatchStatus.NOT_AVAILABLE)
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
