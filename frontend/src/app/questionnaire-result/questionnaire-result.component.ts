import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReponseOpenAI } from '@app/model/openai';
import { ReponseOpenAIService } from '@app/services/openai.service';

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrls: ['./questionnaire-result.component.scss']
})
export class QuestionnaireResultComponent implements OnInit {
  response: ReponseOpenAI | null = null;
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reponseOpenAIService: ReponseOpenAIService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.userId = navigation.extras.state['userId'];
    }
  }

  ngOnInit(): void {
    if (this.userId !== null) {
      this.reponseOpenAIService.getReponsesByUserId(this.userId).subscribe(
        (responses: ReponseOpenAI[]) => {
          if (responses.length > 0) {
            this.response = responses[0]; // Utilisez la première réponse ou appliquez une logique pour sélectionner la réponse appropriée
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des réponses :', error);
        }
      );
    } else {
      console.error('Aucun userId disponible.');
    }
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
