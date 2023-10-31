import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MovementService} from "../../../services/movement.service";
import {MovementType} from "../../../entities/MovementType";
import Member from "../../../entities/Member";
import {MemberService} from "../../../services/member.service";
import {BehaviorSubject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-movement',
  templateUrl: './create-movement.component.html',
  styleUrls: ['./create-movement.component.css']
})
export class CreateMovementComponent implements OnInit {

  submitted = false;
  members$ = new BehaviorSubject<Member[]>([])

  form: FormGroup = new FormGroup({
    type: new FormControl<MovementType>(MovementType.EXPENSE),
    member: new FormControl<Member | undefined>(undefined),
    amount: new FormControl<number>(0),
    description: new FormControl<string>(''),
  });

  constructor(private dialogRef: MatDialogRef<CreateMovementComponent>,
              private formBuilder: FormBuilder,
              private movementService: MovementService,
              private memberService: MemberService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        type: [MovementType.EXPENSE, [Validators.required]],
        member: [undefined, [Validators.required]],
        amount: [0, [Validators.required]],
        description: ['', [Validators.required]],
      }
    );

    this.memberService.getAll$().subscribe({
      next: members => this.members$.next(members)
    })
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const type: MovementType = this.form.get('type')?.value;
    const member: Member = this.form.get('member')?.value;
    const amount: number = this.form.get('amount')?.value;
    const description: string = this.form.get('description')?.value;

    switch (type) {
      case MovementType.EXPENSE: {
        if (amount > 0) {
          this.snackBar.open("Para un gasto la cantidad no puede ser un valor positivo",
            "Ok", {
              duration: 5000
            });
        }
        break;
      }
      case MovementType.INCOME: {
        if (amount < 0) {
          this.snackBar.open("Para un ingreso la cantidad no puede ser un valor negativo",
            "Ok", {
              duration: 5000
            });
        }
        break;
      }
    }

    this.movementService.create$(type, member.id, amount, description).subscribe({
      next: () => this.dialogRef.close(),
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.snackBar.open("Error creando el movimiento",
          "Ok", {
            duration: 5000
          });
      }
    });
  }
}
