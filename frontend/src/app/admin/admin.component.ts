import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '@app/services/questionnaire-service.service';
import { Questionnaire } from '@app/model/questionnaire';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menuOpen: boolean = false;
  questionnaires: Questionnaire[] = [];

  constructor(private questionnaireService: QuestionnaireService) { }

  ngOnInit(): void {
    this.loadQuestionnaires();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
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
