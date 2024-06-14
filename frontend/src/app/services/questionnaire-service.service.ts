import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questionnaire } from '../model/questionnaire'; // Assurez-vous d'importer le modèle Questionnaire approprié
import { Question } from '../model/questionnaire';
@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private questionnairesUrl: string;

  constructor(private http: HttpClient) {
    this.questionnairesUrl = 'http://localhost:8080/questionnaires'; // Assurez-vous de remplacer l'URL par celle de votre API
  }

  // Méthode pour récupérer les questions associées à un questionnaire spécifique
  public getQuestionsByQuestionnaireId(questionnaireId: number): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(`${this.questionnairesUrl}/${questionnaireId}`);
  }
  

  public getAllQuestionnaires(): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(`${this.questionnairesUrl}`);
  }

  public addQuestionnaire(questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http.post<Questionnaire>(`${this.questionnairesUrl}`, questionnaire);
  }

  public updateQuestionnaire(questionnaireId: number, questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http.put<Questionnaire>(`${this.questionnairesUrl}/${questionnaireId}`, questionnaire);
  }

  public getQuestionnaireById(questionnaireId: number): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(`${this.questionnairesUrl}/${questionnaireId}`);
  }

  public deleteQuestionnaire(questionnaireId: number): Observable<void> {
    return this.http.delete<void>(`${this.questionnairesUrl}/${questionnaireId}`);
  }

 // getUnansweredQuestions(userId: number): Observable<Question[]> {
   // return this.http.get<Question[]>(`${this.questionnairesUrl}/questions/unanswered/${userId}`);
 // }

  getUnansweredQuestionnaires(userId: number): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(`${this.questionnairesUrl}/unanswered/${userId}`);
  }

}
