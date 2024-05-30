import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  menuOpen= true;

  dataSource = new MatTableDataSource<Mentor>(); // Source de données pour la table
  displayedColumns: string[] = ['id', 'specialite'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  pageSize: number = 10; // Vous pouvez ajuster cette valeur selon vos besoins

  constructor(private mentorService: MentorService) { }

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



  addMentor(): void {
    this.mentorService.addMentor(this.newMentor).subscribe(() => {
      this.newMentor = new Mentor();
      this.loadMentors();
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
