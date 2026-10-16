import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoanEdit } from '../loan-edit/loan-edit';
import { LoanService } from '../loan';
import { Loan } from '../model/loan';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Client } from '../../client/model/client';
import { ClientService } from '../../client/client';
import { Game } from '../../game/model/game';
import { GameService } from '../../game/game';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { formatDate } from '@angular/common';


@Component({
  imports: [MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatLabel,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule
  ],
  selector: 'app-loan-list',
  standalone: true,
  styleUrl: './loan-list.page.scss',
  templateUrl: './loan-list.page.html',
})
export class LoanListPage implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  protected readonly loans = signal<Loan[]>([]);
  protected readonly clients = signal<Client[]>([]);
  protected readonly games = signal<Game[]>([]);
  protected readonly filterClient = signal<Client | null>(null);
  protected readonly filterGame = signal<Game | null>(null);
  protected readonly filterDate = signal<Date | null>(null);

  protected readonly gameService = inject(GameService);
  protected readonly clientService = inject(ClientService);
  protected readonly dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'startDate', 'endDate', 'action'];


  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(g => this.games.set(g));
    this.clientService.getClients().subscribe(c => this.clients.set(c));
    this.loadPage();
  }

  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    const gameId = this.filterGame()?.id ?? null;
    const clientId = this.filterClient()?.id ?? null;
    const date = this.filterDate();
    const formattedDate = date ? formatDate(date, 'yyyy-MM-dd', 'en-US') : undefined;


    this.loanService.getLoans(pageable, gameId, clientId, formattedDate).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }


  onCleanFilter(): void {
    this.filterGame.set(null);
    this.filterClient.set(null);
    this.filterDate.set(null);
    this.onSearch();
  }

  onSearch(): void {
    this.pageNumber = 0;
    this.loadPage();
  }


  createLoan() {
    const dialogRef = this.dialog.open(LoanEdit, { data: {} });
    dialogRef.afterClosed().subscribe((result) => { this.ngOnInit(); });
  }

  editLoan(loan: Loan) {
    const dialogRef = this.dialog.open(LoanEdit, { data: { loan: loan }, });
    dialogRef.afterClosed().subscribe((result) => { this.ngOnInit(); });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, { data: { title: 'Eliminar préstamo', description: 'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?', }, });
    dialogRef.afterClosed().subscribe((result => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    }));
  }
}
