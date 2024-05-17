import { Component, OnInit } from '@angular/core';
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

  loadMentors(): void {
    this.mentorService.getAllMentors().subscribe(mentors => {
      this.mentors = mentors;
    });
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
