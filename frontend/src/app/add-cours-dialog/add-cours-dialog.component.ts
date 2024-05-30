import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Course } from '@app/model/cours.model';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-cours-dialog.component.html',
  styleUrls: ['./add-cours-dialog.component.scss']

})
export class AddCourseDialogComponent {
  newCourse: Course = {
    id: 0,
    titre: '',
    description: '',
    duree: '',
    urlCours: '',
    niveau: ''
  };

  constructor(public dialogRef: MatDialogRef<AddCourseDialogComponent>) {}

  onSubmit(): void {
    this.dialogRef.close(this.newCourse);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
