import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '@app/services/questionnaire-service.service';
import { Questionnaire } from '@app/model/questionnaire';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menuOpen= true;
  questionnaires: Questionnaire[] = [];

  constructor(private questionnaireService: QuestionnaireService) { }

 

  ngOnInit(): void {
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

  loadQuestionnaires() {
    this.questionnaireService.getAllQuestionnaires().subscribe(
      (data: Questionnaire[]) => {
        this.questionnaires = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des questionnaires : ', error);
      }
    );
  }
}
