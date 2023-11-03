import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MovementService} from "../../services/movement.service";
import {MovementType} from "../../entities/MovementType";

export interface TableData {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-total-balance',
  templateUrl: './total-balance.component.html',
  styleUrls: ['./total-balance.component.css']
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

  constructor(private movementService: MovementService) {
  }

  ngOnInit(): void {
    this.movementService.getTotalBalance$().subscribe({
      next: balance => {
        this.dataSource = [
          {name: "Balance 22/23", amount: this.lastYearBalance},
          {name: "Cuotas y multas totales", amount: balance.totalExpenses * -1},
          {name: "Cuotas y multas pagadas", amount: balance.totalIncomes},
          {name: "Cuotas y multas sin pagar", amount: (balance.totalIncomes + balance.totalExpenses) * -1},
          {name: "Pago del campo", amount: this.fieldAnnualPay},
          {name: "Pago del dominio wev pkmh.es", amount: this.domainAnnualPay},
          {name: "Compra de nuevo balón", amount: 126}
        ]
        this.totalDataSource = [{
          name: "Ingresos totales (temporada anterior + cuotas y multas pagadas)",
          amount: this.lastYearBalance + balance.totalIncomes
        },
          {
            name: "Gastos totales (pago del campo mas otros gastos)",
            amount: this.fieldAnnualPay + this.domainAnnualPay + 126
          }
        ];
        this.total = -this.fieldAnnualPay + this.lastYearBalance + balance.totalIncomes;
        this.isLoading$.next(false);
      },
      error: err => {
        console.log(err);
        this.isLoading$.next(false);
      }
    })
  }

  protected readonly MovementType = MovementType;
}
