import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { from } from 'rxjs';

@Component({
  imports: [MatButtonModule],
  selector: 'app-dialog-error',
  styleUrl: './dialog-error.scss',
  templateUrl: './dialog-error.html',
  standalone: true,
})
export class DialogErrorComponent {

  protected readonly title = signal<string | null>(null);
  protected readonly description = signal<string | null>(null);

  protected readonly dialogRef = inject(MatDialogRef<DialogErrorComponent>);
  protected readonly data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.title.set(this.data.title);
    this.description.set(this.data.description);
  }

  onClose(value = false) {
    this.dialogRef.close(value);
  }
}
