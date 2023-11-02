import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MovementService} from "../../../services/movement.service";
import Movement from "../../../entities/Movement";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-movement',
  templateUrl: './delete-movement.component.html',
  styleUrls: ['./delete-movement.component.css']
})
export class DeleteMovementComponent {
  constructor(private dialogRef: MatDialogRef<DeleteMovementComponent>,
              private movementService: MovementService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Movement) {
  }

  deleteMovement() {
    this.movementService.delete$(this.data.id).subscribe({
      next: () => this.dialogRef.close(),
      error: () => this.snackBar.open("Error borrando el movimiento",
        "Ok", {
          duration: 5000
        })
    })
  }
}
