// edit-course-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../model/cours.model';
import { Formation } from '@app/model/formation.model';

@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-cours-dialog.component.html',
  styleUrls: ['./edit-cours-dialog.component.scss']
})
export class EditCourseDialogComponent {

  editedCourse: Course;
  formations: Formation[] = [];
  selectedFormationId: number | null = null;


  constructor(
    public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {
    // Cloner les données pour éviter la modification directe des données d'origine
    this.editedCourse = { ...data };
  }

  onSubmit(): void {
    // Émettre les données éditées pour les envoyer au composant parent
    this.dialogRef.close(this.editedCourse);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
