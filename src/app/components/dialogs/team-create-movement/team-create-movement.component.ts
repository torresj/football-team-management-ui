import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovementType } from 'src/app/entities/MovementType';
import { CreateMovementComponent } from '../create-movement/create-movement.component';
import { TeamMovementService } from 'src/app/services/team-movement.service';

@Component({
  selector: 'app-team-create-movement',
  templateUrl: './team-create-movement.component.html',
  styleUrls: ['./team-create-movement.component.css'],
})
export class TeamCreateMovementComponent {
  submitted = false;

  form: FormGroup = new FormGroup({
    type: new FormControl<MovementType>(MovementType.EXPENSE),
    amount: new FormControl<number>(0),
    description: new FormControl<string>(''),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateMovementComponent>,
    private formBuilder: FormBuilder,
    private teamMovementService: TeamMovementService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      type: [MovementType.EXPENSE, [Validators.required]],
      amount: [0, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const type: MovementType = this.form.get('type')?.value;
    const amount: number = this.form.get('amount')?.value;
    const description: string = this.form.get('description')?.value;

    switch (type) {
      case MovementType.EXPENSE: {
        if (amount > 0) {
          this.snackBar.open(
            'Para un gasto la cantidad no puede ser un valor positivo',
            'Ok',
            {
              duration: 5000,
            }
          );
          return;
        }
        break;
      }
      case MovementType.INCOME: {
        if (amount < 0) {
          this.snackBar.open(
            'Para un ingreso la cantidad no puede ser un valor negativo',
            'Ok',
            {
              duration: 5000,
            }
          );
          return;
        }
        break;
      }
    }

    this.teamMovementService.create$(type, amount, description).subscribe({
      next: () => this.dialogRef.close(),
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.snackBar.open('Error creando el movimiento', 'Ok', {
          duration: 5000,
        });
      },
    });
  }
}
