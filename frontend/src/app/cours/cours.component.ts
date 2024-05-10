import { Component, OnInit } from '@angular/core';
import { Course } from '../model/cours.model';
import { CourseService } from '../services/cours.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseDialogComponent } from '@app/add-cours-dialog/add-cours-dialog.component';// votre boîte de dialogue d'ajout de cours ici
import { EditCourseDialogComponent } from '@app/edit-cours-dialog/edit-cours-dialog.component';
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent implements OnInit {

  courses: Course[] = [];
  selectedCourse: Course | null = null;

  constructor(private courseService: CourseService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  openAddCourseDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCourse(result);
      }
    });
  }

  addCourse(newCourse: Course): void {
    this.courseService.addCourse(newCourse).subscribe(() => {
      this.loadCourses();
    });
  }

  openEditDialog(course: Course): void {
    const dialogRef = this.dialog.open(EditCourseDialogComponent, {
      width: '500px',
      data: course // Passez le cours à votre composant de boîte de dialogue de modification
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si des données sont renvoyées depuis la boîte de dialogue, mettez à jour le cours
        this.updateCourse(result);
      }
    });
  }

  updateCourse(course: Course): void {
    if (this.selectedCourse) {
      this.courseService.updateCourse(this.selectedCourse.id, this.selectedCourse)
        .subscribe(updatedCourse => {
          // Mettre à jour le cours dans la liste des cours
          const index = this.courses.findIndex(c => c.id === updatedCourse.id);
          if (index !== -1) {
            this.courses[index] = updatedCourse;
          }
          // Réinitialiser le cours sélectionné
          this.selectedCourse = null;
        });
    }
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.loadCourses();
    });
  }

  confirmDeleteCourse(course: Course): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      this.deleteCourse(course.id);
    }
  }

}
