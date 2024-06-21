import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Course } from '@app/model/cours.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formation } from '@app/model/formation.model';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-cours-dialog.component.html',
  styleUrls: ['./add-cours-dialog.component.scss']
})
export class AddCourseDialogComponent implements OnInit {
  addCourseForm!: FormGroup;
  formations: Formation[] = [];
  selectedFormationId: number | null = null;

  newCourse: Course = {
    id: 0,
    titre: '',
    description: '',
    duree: '',
    urlCours: '',
    niveau: '',
    formationId:0,
    mentorId:0,
    userId:0
  };

  constructor(
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addCourseForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      duree: ['', Validators.required],
      urlCours: ['', Validators.required],
      niveau: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addCourseForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.newCourse = this.addCourseForm.value;
    this.dialogRef.close(this.newCourse);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
