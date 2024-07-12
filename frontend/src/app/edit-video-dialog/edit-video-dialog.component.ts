import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VideoMentor } from '@app/model/video-mentor';

@Component({
  selector: 'app-edit-video-dialog',
  templateUrl: './edit-video-dialog.component.html',
  styleUrls: ['./edit-video-dialog.component.scss']
})
export class EditVideoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditVideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VideoMentor
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data);
  }
}
