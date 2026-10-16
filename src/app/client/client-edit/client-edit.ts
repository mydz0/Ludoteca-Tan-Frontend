import { Component, OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client';
import { Client } from '../model/client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../../core/dialog-error/dialog-error';

@Component({
    selector: 'app-category-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './client-edit.html',
    styleUrl: './client-edit.scss'
})
export class ClientEditComponent implements OnInit {
    protected readonly dialogRef = inject(MatDialogRef<ClientEditComponent>);
    protected readonly clientService = inject(ClientService);
    protected readonly dialog = inject(MatDialog);


    protected readonly id = signal<number | null>(null);
    protected readonly name = signal<string | null>(null);

    loadFormData(): void {
        this.id.set(null);
        this.name.set(null);
    }

    ngOnInit(): void {
        this.loadFormData();
    }



    onSave() {
        const id = this.id();
        const name = this.name();

        if (!name) {
            return;
        }

        const client = { id, name } as Client;
        this.clientService.saveClient(client).subscribe({
            next: () => this.dialogRef.close(true),
            error: () => {
                this.dialog.open(DialogErrorComponent, { data: { title: "Nombre duplicado", description: "Ya existe un cliente con ese nombre" } })
            }
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
