import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { MovementService } from '../../services/movement.service';
import { MovementType } from '../../entities/MovementType';
import { TeamMovementService } from 'src/app/services/team-movement.service';
import { MatTableDataSource } from '@angular/material/table';
import Movement from 'src/app/entities/Movement';
import { ReportService } from 'src/app/services/report.service';

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
  isDownloading$ = new BehaviorSubject(false);
  columns: string[] = ['description', 'amount'];
  totalColumns: string[] = ['name', 'amount'];
  dataSource = new MatTableDataSource<Movement>();
  totalDataSource: TableData[] = [];
  totalTeamDataSource: TableData[] = [];
  total = 0;

  constructor(
    private movementService: MovementService,
    private teamMovementService: TeamMovementService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.movementService.getTotalBalance$(),
      this.teamMovementService.getTotalBalance$(),
      this.teamMovementService.getAllTeamMovements$(),
    ]).subscribe((data) => {
      this.dataSource.data = data[2];

      this.totalDataSource = [
        {
          name: 'Cuotas y multas totales',
          amount: data[0].totalExpenses * -1,
        },
        { name: 'Cuotas y multas pagadas', amount: data[0].totalIncomes },
        {
          name: 'Cuotas y multas sin pagar',
          amount: (data[0].totalIncomes + data[0].totalExpenses) * -1,
        },
      ];

      this.totalTeamDataSource = [
        {
          name: 'Ingresos totales (temporada anterior + cuotas y multas pagadas)',
          amount: data[1].totalIncomes,
        },
        {
          name: 'Gastos totales (pago del campo + otros gastos)',
          amount: data[1].totalExpenses,
        },
      ];
      this.total = data[1].totalIncomes + data[1].totalExpenses;
      this.isLoading$.next(false);
    });
  }

  getReportPDF() {
    this.isDownloading$.next(true);
    this.reportService.getPDFReport$().subscribe((data) => {
      var file = new Blob([data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      var a = document.createElement('a');
      a.href = fileURL;
      a.target = '_blank';
      a.download = 'balance.pdf';
      document.body.appendChild(a);
      a.click();
      this.isDownloading$.next(false);
    });
  }

  protected readonly MovementType = MovementType;
}
