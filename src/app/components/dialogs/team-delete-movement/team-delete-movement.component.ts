import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Movement from 'src/app/entities/Movement';
import { DeleteMovementComponent } from '../delete-movement/delete-movement.component';
import { TeamMovementService } from 'src/app/services/team-movement.service';

@Component({
  selector: 'app-team-delete-movement',
  templateUrl: './team-delete-movement.component.html',
  styleUrls: ['./team-delete-movement.component.css'],
})
export class TeamDeleteMovementComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteMovementComponent>,
    private teamMovementService: TeamMovementService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Movement
  ) {}

  deleteMovement() {
    this.teamMovementService.delete$(this.data.id).subscribe({
      next: () => this.dialogRef.close(),
      error: () =>
        this.snackBar.open('Error borrando el movimiento', 'Ok', {
          duration: 5000,
        }),
    });
  }
}
