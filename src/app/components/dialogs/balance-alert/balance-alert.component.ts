import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Member from 'src/app/entities/Member';
import { ConfirmAssistanceComponent } from '../confirm-assistance/confirm-assistance.component';

@Component({
  selector: 'app-balance-alert',
  templateUrl: './balance-alert.component.html',
  styleUrls: ['./balance-alert.component.css'],
})
export class BalanceAlertComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmAssistanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Member
  ) {}

  goToMyBalance() {
    this.router.navigateByUrl('/my-balance');
    this.dialogRef.close();
  }
}
