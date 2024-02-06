import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovementService } from '../../services/movement.service';
import { MovementType } from '../../entities/MovementType';

export interface TableData {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-total-balance',
  templateUrl: './total-balance.component.html',
  styleUrls: ['./total-balance.component.css'],
})
export class TotalBalanceComponent implements OnInit {
  isLoading$ = new BehaviorSubject(true);
  columns: string[] = ['name', 'amount'];
  dataSource: TableData[] = [];
  totalDataSource: TableData[] = [];
  total = 0;
  lastYearBalance = 938;
  fieldAnnualPay = 1500;
  domainAnnualPay = 20;

  constructor(private movementService: MovementService) {}

  ngOnInit(): void {
    this.movementService.getTotalBalance$().subscribe({
      next: (balance) => {
        this.dataSource = [
          { name: 'Balance 22/23', amount: this.lastYearBalance },
          {
            name: 'Cuotas y multas totales',
            amount: balance.totalExpenses * -1,
          },
          { name: 'Cuotas y multas pagadas', amount: balance.totalIncomes },
          {
            name: 'Cuotas y multas sin pagar',
            amount: balance.totalIncomes + balance.totalExpenses,
          },
          { name: 'Pago del campo', amount: this.fieldAnnualPay * -1 },
          {
            name: 'Pago del dominio web pkmh.es',
            amount: this.domainAnnualPay * -1,
          },
          { name: 'Compra de nuevo balón', amount: -126 },
          {
            name: 'Equipación de repuesto + dos juegos de guantes',
            amount: -94,
          },
          {
            name: '29 pantalones blancos a 5€ cada uno',
            amount: -145,
          },
        ];
        this.totalDataSource = [
          {
            name: 'Ingresos totales (temporada anterior + cuotas y multas pagadas)',
            amount: this.lastYearBalance + balance.totalIncomes,
          },
          {
            name: 'Gastos totales (pago del campo + otros gastos)',
            amount:
              (this.fieldAnnualPay + this.domainAnnualPay + 126 + 94 + 145) *
              -1,
          },
        ];
        this.total =
          this.lastYearBalance +
          balance.totalIncomes -
          (this.fieldAnnualPay + this.domainAnnualPay + 126 + 94 + 145);
        this.isLoading$.next(false);
      },
      error: (err) => {
        console.log(err);
        this.isLoading$.next(false);
      },
    });
  }

  protected readonly MovementType = MovementType;
}
