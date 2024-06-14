import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReponseQuestion } from '@app/model/questionnaire';

@Injectable({
  providedIn: 'root'
})
export class ReponseQuestionService {
  private apiUrl = 'http://localhost:8080'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }

 

  // Méthode pour ajouter une réponse
  public addReponse(reponseQuestion: ReponseQuestion): Observable<ReponseQuestion> {
    return this.http.post<ReponseQuestion>(`${this.apiUrl}/reponsesQ/add`, reponseQuestion);
  }
  

  // Méthode pour récupérer une réponse par son ID
  getResponseById(id: number): Observable<ReponseQuestion> {
    return this.http.get<ReponseQuestion>(`${this.apiUrl}/questions/getQuesttion/${id}`);
  }
  // Méthode pour mettre à jour une réponse
  updateReponse(id: number, reponse: ReponseQuestion): Observable<ReponseQuestion> {
    return this.http.put<ReponseQuestion>(`${this.apiUrl}/reponsesQ/update/${id}`, reponse);
  }

  getResponsesByQuestionId(questionId: number): Observable<ReponseQuestion[]> {
    return this.http.get<ReponseQuestion[]>(`${this.apiUrl}/questions/getQuestion/${questionId}`);
  }
  // Méthode pour supprimer une réponse
  deleteReponse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reponsesQ/delete/${id}`);
  }
}
