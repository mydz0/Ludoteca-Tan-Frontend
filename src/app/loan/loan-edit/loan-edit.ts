import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoanService } from '../loan';
import { Loan } from '../model/loan';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { validateFields } from '../../core/helpers/validation.helper';
import { Game } from '../../game/model/game';
import { Client } from '../../client/model/client';
import { ClientService } from '../../client/client';
import { GameService } from '../../game/game';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DialogErrorComponent } from '../../core/dialog-error/dialog-error';




@Component({
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule],

  selector: 'app-loan-edit',
  standalone: true,
  styleUrl: './loan-edit.scss',
  templateUrl: './loan-edit.html',
})
export class LoanEdit implements OnInit {

  private readonly gameService = inject(GameService);
  private readonly clientService = inject(ClientService);

  protected readonly loanService = inject(LoanService);
  protected readonly dialogRef = inject(MatDialogRef<LoanEdit>);
  protected readonly data = inject(MAT_DIALOG_DATA);
  protected readonly dialog = inject(MatDialog);


  protected readonly id = signal<number | null>(null);
  protected readonly game = signal<Game | null>(null);
  protected readonly client = signal<Client | null>(null);
  protected readonly startDate = signal<Date | null>(null);
  protected readonly endDate = signal<Date | null>(null);
  protected readonly games = signal<Game[]>([]);
  protected readonly clients = signal<Client[]>([]);
  protected byId = (a: { id: number } | null, b: { id: number } | null) => a?.id === b?.id;

  private showError(description: String) {
    this.dialog.open(DialogErrorComponent, { data: { title: "No se puede guardar", description } })
  }

  loadFormData(initialData: Loan | null) {
    this.id.set(initialData?.id ?? null);
    this.game.set(initialData?.game ?? null);
    this.client.set(initialData?.client ?? null);
    this.startDate.set(initialData?.startDate ?? null);
    this.endDate.set(initialData?.endDate ?? null);
  }

  ngOnInit(): void {
    this.loadFormData(this.data.loan ?? null);
    this.gameService.getGames().subscribe((g) => this.games.set(g));
    this.clientService.getClients().subscribe((c) => this.clients.set(c));
  }

  onSave() {
    const id = this.id();
    const game = this.game();
    const client = this.client();
    const startDate = this.startDate();
    const endDate = this.endDate();

    const requiredFields = ["game", "client", "startDate", "endDate"] as const
    const data = { game, client, startDate, endDate }


    if (!validateFields(data, requiredFields)) {
      return;
    }


    if (endDate! < startDate!) {
      this.showError('La fecha de fin no puede ser menor a la de inicio');
      return;
    }

    const days = (endDate!.getTime() - startDate!.getTime()) / (1000 * 60 * 60 * 24)

    if (days > 14) {
      this.showError('No se puede hacer un préstamo de más de 14 días');
      return;
    }

    const loan = {
      id,
      game: game!,
      client: client!,
      startDate: startDate!,
      endDate: endDate!,
    } as Loan;
    this.loanService.saveLoan(loan).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        this.showError(err.error?.message ?? 'Un cliente ya tiene prestado ese juego')
      }
    })

  }

  onClose() {
    this.dialogRef.close(false);
  }
}
