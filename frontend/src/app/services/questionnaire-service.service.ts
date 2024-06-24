import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questionnaire } from '../model/questionnaire'; // Assurez-vous d'importer le modèle Questionnaire approprié
import { Question } from '../model/questionnaire';
import { CompilerConfig } from '@angular/compiler';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

 

  constructor(private http: HttpClient, private configService: ConfigService) {
    }

  // Méthode pour récupérer les questions associées à un questionnaire spécifique
  public getQuestionsByQuestionnaireId(questionnaireId: number): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(`${this.configService.apiUrl}/questionnaires/${questionnaireId}`);
  }
  

  public getAllQuestionnaires(): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(`${this.configService.apiUrl}/questionnaires`);
  }

  public addQuestionnaire(questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http.post<Questionnaire>(`${this.configService.apiUrl}/questionnaires`, questionnaire);
  }

  public updateQuestionnaire(questionnaireId: number, questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http.put<Questionnaire>(`${this.configService.apiUrl}/questionnaires/${questionnaireId}`, questionnaire);
  }

  public getQuestionnaireById(questionnaireId: number): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(`${this.configService.apiUrl}/questionnaires/${questionnaireId}`);
  }

  public deleteQuestionnaire(questionnaireId: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.apiUrl}/questionnaires/${questionnaireId}`);
  }

 // getUnansweredQuestions(userId: number): Observable<Question[]> {
   // return this.http.get<Question[]>(`${this.questionnairesUrl}/questions/unanswered/${userId}`);
 // }

  getUnansweredQuestionnaires(userId: number): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(`${this.configService.apiUrl}/questionnaires/unanswered/${userId}`);
  }

}
