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
    this.questionnairesUrl = 'http://localhost:8080'; // Assurez-vous de remplacer l'URL par celle de votre API
  }

  // Méthode pour récupérer les questions associées à un questionnaire spécifique
  public getQuestionsByQuestionnaireId(questionnaireId: number): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(`${this.questionnairesUrl}/questionnaires/getQuestionnaire/${questionnaireId}`);
  }
  

  public getAllQuestionnaires(): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(`${this.questionnairesUrl}/questionnaires/all`);
  }

  public addQuestionnaire(questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http.post<Questionnaire>(`${this.questionnairesUrl}/questionnaires/addQuestionnaire`, questionnaire);
  }

  public updateQuestionnaire(questionnaireId: number, questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http.put<Questionnaire>(`${this.questionnairesUrl}/questionnaires/update/${questionnaireId}`, questionnaire);
  }

  public getQuestionnaireById(questionnaireId: number): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(`${this.questionnairesUrl}/questionnaires/getQuestionnaire/${questionnaireId}`);
  }

  public deleteQuestionnaire(questionnaireId: number): Observable<void> {
    return this.http.delete<void>(`${this.questionnairesUrl}/questionnaires/delete/${questionnaireId}`);
  }

 // getUnansweredQuestions(userId: number): Observable<Question[]> {
   // return this.http.get<Question[]>(`${this.questionnairesUrl}/questions/unanswered/${userId}`);
 // }

  getUnansweredQuestionnaires(userId: number): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(`${this.questionnairesUrl}/questionnaires/unanswered/${userId}`);
  }

}
