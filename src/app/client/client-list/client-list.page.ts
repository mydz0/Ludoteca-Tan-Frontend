import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../model/client';
import { ClientService } from '../client';
import { ClientEditComponent } from '../client-edit/client-edit';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';




@Component({
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  selector: 'app-client-list',
  standalone: true,
  styleUrl: './client-list.page.scss',
  templateUrl: './client-list.page.html'
})
export class ClientListComponent implements OnInit {
  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  protected readonly clientService = inject(ClientService);
  protected readonly dialog = inject(MatDialog);

  constructor(private ClientService: ClientService,
  ) { }

  loadData(): void {
    this.clientService.getClients().subscribe(
      clients => this.dataSource.data = clients
    );
  }


  ngOnInit(): void {
    this.ClientService.getClients().subscribe(clients => this.dataSource.data = clients);
  }



  createClient() {
    const dialogRef = this.dialog.open(ClientEditComponent, { data: {} });
    dialogRef.afterClosed().subscribe(result => { if (!result) return; this.loadData() });
  }


  editClient(client: Client) {
    const dialogRef = this.dialog.open(ClientEditComponent, { data: { client } });

    dialogRef.afterClosed().subscribe(result => { if (!result) return; this.loadData() });

  }

  deleteClient(client: Client) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, { data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar cliente?" } })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ClientService.deleteClient(client.id).subscribe(result => {
          this.loadData();
        });
      }
    });
  }

}
