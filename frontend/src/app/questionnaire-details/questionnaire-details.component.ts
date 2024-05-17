// questionnaire-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '@app/services/questionnaire-service.service';
import { Questionnaire } from '../model/questionnaire';

@Component({
  selector: 'app-questionnaire-details',
  templateUrl: './questionnaire-details.component.html',
  styleUrls: ['./questionnaire-details.component.scss']
})
export class QuestionnaireDetailsComponent implements OnInit {
  questionnaires: Questionnaire[] = [];
  currentQuestionnaireIndex: number = 0;
  currentQuestionnaire: Questionnaire | undefined;
  errorMessage: string | undefined;

  selectedAnswers: { [questionId: number]: string } = {};
  selectedOther: { [questionId: number]: boolean } = {};
  otherAnswers: { [questionId: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) {}

  ngOnInit(): void {
    this.loadAllQuestionnaires();
  }

  loadAllQuestionnaires(): void {
    this.questionnaireService.getAllQuestionnaires().subscribe(
      (data) => {
        this.questionnaires = data;
        this.loadCurrentQuestionnaire();
      },
      (error) => {
        this.errorMessage = 'Error loading questionnaires';
        console.error('Error fetching questionnaires', error);
      }
    );
  }

  loadCurrentQuestionnaire(): void {
    if (this.currentQuestionnaireIndex < this.questionnaires.length) {
      this.currentQuestionnaire = this.questionnaires[this.currentQuestionnaireIndex];
    } else {
      this.currentQuestionnaire = undefined;
      this.errorMessage = 'No more questionnaires available';
      this.redirectToProfile();
    }
  }

  onAnswerSelect(questionId: number, answer: string): void {
    this.selectedAnswers[questionId] = answer;
    this.selectedOther[questionId] = (answer === 'Autre');
  }

  completeCurrentQuestionnaire(): void {
    // Process selected answers before moving to the next questionnaire
    console.log('Selected answers:', this.selectedAnswers);
    console.log('Other answers:', this.otherAnswers);

    this.currentQuestionnaireIndex++;
    this.loadCurrentQuestionnaire();
  }

  redirectToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
