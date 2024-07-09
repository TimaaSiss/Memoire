import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../model/cours.model';
import { CourseService } from '../services/cours.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseDialogComponent } from '@app/add-cours-dialog/add-cours-dialog.component';
import { EditCourseDialogComponent } from '@app/edit-cours-dialog/edit-cours-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormationService } from '@app/services/formations.service';
import { Formation } from '@app/model/formation.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  menuOpen = true;

  dataSource = new MatTableDataSource<Course>(); // Source de données pour la table
  displayedColumns: string[] = ['id', 'titre', 'duree', 'salaire', 'description', 'url_cours', 'niveau'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  pageSize: number = 10; // Vous pouvez ajuster cette valeur selon vos besoins
  currentUser: any; // Ajout de la propriété currentUser pour stocker l'utilisateur connecté

  constructor(
    private courseService: CourseService,
    private formationService: FormationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCourses();

    // Vérifier si la valeur de menuOpen est stockée localement
    const storedMenuOpen = localStorage.getItem('menuOpen');
    if (storedMenuOpen !== null) {
      // Si une valeur est trouvée dans le stockage local, la mettre à jour
      this.menuOpen = JSON.parse(storedMenuOpen);
    }

    // Récupérer l'utilisateur actuel à partir du localStorage
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      this.currentUser = JSON.parse(currentUserString);
      console.log('currentUser :', this.currentUser);
    }
  }

  toggleMenu(): void {
    // Basculer l'état menuOpen
    this.menuOpen = !this.menuOpen;
    // Enregistrer l'état menuOpen dans le stockage du navigateur
    localStorage.setItem('menuOpen', JSON.stringify(this.menuOpen));
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
      this.dataSource = new MatTableDataSource<Course>(this.courses.slice(0, 10)); // Charger les 10 premiers utilisateurs
      this.dataSource.paginator = this.paginator; // Configurer la pagination
    });
  }

  loadMoreCourses(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    // Charger les utilisateurs suivants selon l'index de page
    this.dataSource = new MatTableDataSource<Course>(this.courses.slice(startIndex, endIndex));
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
    if (this.currentUser && this.currentUser.id) {
      const formationId = newCourse.formationId; // Assurez-vous que formationId est passé correctement
      this.courseService.addCourse(this.currentUser.id, newCourse, formationId).subscribe(() => {
        this.loadCourses();
        this.snackBar.open('Cours ajouté avec succès', 'Fermer', {
          duration: 3000, // Durée en millisecondes
          verticalPosition: 'top', // Position verticale
          horizontalPosition: 'right', // Position horizontale
            panelClass: 'custom-snackbar'
        });
      });
    } else {
      console.error('Utilisateur non connecté. Impossible d\'ajouter le cours.');
    }
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
          this.snackBar.open('Cours mis à jour avec succès', 'Fermer', {
            duration: 3000, // Durée en millisecondes
            verticalPosition: 'top', // Position verticale
            horizontalPosition: 'right', // Position horizontale
              panelClass: 'custom-snackbar'
          });
        });
    }
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.loadCourses();
      this.snackBar.open('Cours mis supprimé avec succès', 'Fermer', {
        duration: 3000, // Durée en millisecondes
        verticalPosition: 'top', // Position verticale
        horizontalPosition: 'right', // Position horizontale
          panelClass: 'custom-snackbar'
      });
    });
  }

  confirmDeleteCourse(course: Course): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      this.deleteCourse(course.id);
    }
  }
}
