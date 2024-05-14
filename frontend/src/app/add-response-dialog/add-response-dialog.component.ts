import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-response-dialog',
  templateUrl: './add-response-dialog.component.html',
  styleUrls: ['./add-response-dialog.component.scss']
})
export class AddResponseDialogComponent {
  newResponse: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddResponseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.newResponse.trim() !== '') {
      // Fermer le dialogue et renvoyer la nouvelle réponse
      this.dialogRef.close(this.newResponse);
    }
  }
}
