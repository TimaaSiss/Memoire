// questionnaire-history.component.ts
import { Component, OnInit } from '@angular/core';
import { ReponseUserService } from '@app/services/reponse-user.service';
import { User } from '@app/model/user';
import { ReponseUser } from '@app/model/reponse-user.model';

@Component({
  selector: 'app-questionnaire-history',
  templateUrl: './questionnaire-history.component.html',
  styleUrls: ['./questionnaire-history.component.scss']
})
export class QuestionnaireHistoryComponent implements OnInit {
  currentUser!: User;
  userResponses: ReponseUser[] = [];

  constructor(private reponseUserService: ReponseUserService) { }

  ngOnInit(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      this.currentUser = JSON.parse(currentUserString);
      this.loadUserResponses();
    }
  }

  loadUserResponses(): void {
    if (this.currentUser && this.currentUser.id) {
      this.reponseUserService.getUserResponses(this.currentUser.id).subscribe(
        (responses: ReponseUser[]) => {
          this.userResponses = responses;
        },
        (error) => {
          console.error('Error fetching user responses:', error);
        }
      );
    }
  }
}
