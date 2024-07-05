import { FormationService } from '@app/services/formations.service';
// edit-course-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../model/cours.model';
import { Formation } from '@app/model/formation.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-cours-dialog.component.html',
  styleUrls: ['./edit-cours-dialog.component.scss']
})
export class EditCourseDialogComponent {
  editCourseForm!: FormGroup;
  editedCourse: Course;
  formations: Formation[] = [];
  selectedFormationId: number | null = null;


  constructor(
    public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private formationService: FormationService,
    private formBuilder: FormBuilder

  ) {
    // Cloner les données pour éviter la modification directe des données d'origine
    this.editedCourse = { ...data };
  }

  ngOnInit(): void {
    this.editCourseForm = this.formBuilder.group({
      titre: [this.editedCourse.titre, Validators.required],
      description: [this.editedCourse.description, Validators.required],
      duree: [this.editedCourse.duree, Validators.required],
      urlCours: [this.editedCourse.urlCours, Validators.required],
      niveau: [this.editedCourse.niveau, Validators.required],
      formationId: [this.editedCourse.formationId, Validators.required]
    });
  
    // Charger les formations depuis le service
    this.formationService.getAllFormations().subscribe(
      (data: Formation[]) => {
        this.formations = data;
      },
      (error: any) => {
        console.error('Error fetching formations:', error);
      }
    );


  }

  onSubmit(): void {
    // Émettre les données éditées pour les envoyer au composant parent
    this.dialogRef.close(this.editedCourse);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
