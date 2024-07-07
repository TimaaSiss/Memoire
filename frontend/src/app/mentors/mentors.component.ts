import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddMentorComponent } from '@app/add-mentor/add-mentor.component';
import { EditMentorComponent } from '@app/edit-mentor/edit-mentor.component';
import { Mentor } from '@app/model/mentor.model';
import { MentorService } from '@app/services/mentors.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.scss']
})
export class MentorComponent implements OnInit {
  mentors: Mentor[] = [];
  newMentor: Mentor = new Mentor();
  selectedMentor: Mentor | null = null;
  menuOpen = true;

  dataSource = new MatTableDataSource<Mentor>(); // Source de données pour la table
  displayedColumns: string[] = ['id', 'specialite'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  pageSize: number = 10; // Vous pouvez ajuster cette valeur selon vos besoins

  constructor(private mentorService: MentorService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadMentors();
    // Vérifier si la valeur de menuOpen est stockée localement
    const storedMenuOpen = localStorage.getItem('menuOpen');
    if (storedMenuOpen !== null) {
      // Si une valeur est trouvée dans le stockage local, la mettre à jour
      this.menuOpen = JSON.parse(storedMenuOpen);
    }
  }

  toggleMenu(): void {
    // Basculer l'état menuOpen
    this.menuOpen = !this.menuOpen;
    // Enregistrer l'état menuOpen dans le stockage du navigateur
    localStorage.setItem('menuOpen', JSON.stringify(this.menuOpen));
  }

  loadMentors() {
    this.mentorService.getAllMentors().subscribe(data => {
      this.mentors = data;
      this.dataSource = new MatTableDataSource<Mentor>(this.mentors.slice(0, 10)); // Charger les 10 premiers utilisateurs
      this.dataSource.paginator = this.paginator; // Configurer la pagination
    });
  }

  loadMoreMentors(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    // Charger les utilisateurs suivants selon l'index de page
    this.dataSource = new MatTableDataSource<Mentor>(this.mentors.slice(startIndex, endIndex));
  }

  openEditMentor(): void {
    const dialogRef = this.dialog.open(AddMentorComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addMentor(result);
      }
    });
  }

  addMentor(mentor: Mentor): void {
    this.mentorService.addMentor(mentor).subscribe(
      (newMentor) => {
        // Ajouter le nouveau mentor à la liste des mentors
        this.mentors.push(newMentor);
        // Mettre à jour la dataSource avec la liste actualisée des mentors
        this.dataSource = new MatTableDataSource<Mentor>(this.mentors.slice(0, this.pageSize));
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error adding mentor', error);
      }
    );
  }

  openEditDialog(mentor: Mentor): void {
    const dialogRef = this.dialog.open(EditMentorComponent, {
      width: '500px',
      data: mentor // Passez le cours à votre composant de boîte de dialogue de modification
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si des données sont renvoyées depuis la boîte de dialogue, mettez à jour le cours
        this.updateMentor();
      }
    });
  }

  updateMentor(): void {
    if (this.selectedMentor) {
      this.mentorService.updateMentor(this.selectedMentor.id, this.selectedMentor).subscribe(() => {
        this.selectedMentor = null;
        this.loadMentors();
      });
    }
  }

  deleteMentor(id: number): void {
    this.mentorService.deleteMentor(id).subscribe(() => {
      this.loadMentors();
    });
  }

  confirmDeleteMentor(mentor: Mentor): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce mentor ?")) {
      this.deleteMentor(mentor.id);
    }
  }

  editMentor(mentor: Mentor): void {
    // Ajoutez ici la logique pour éditer le mentor sélectionné
  }

  toggleMentorActivation(mentor: Mentor): void {
    // Ajoutez ici la logique pour activer ou désactiver le mentor
  }
}
