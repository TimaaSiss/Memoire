import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReponseQuestion } from '@app/model/questionnaire';

@Injectable({
  providedIn: 'root'
})
export class ReponseQuestionService {
  private apiUrl = 'http://localhost:8080/reponsesQ'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Méthode pour ajouter une réponse
  addReponse(reponse: ReponseQuestion): Observable<ReponseQuestion> {
    return this.http.post<ReponseQuestion>(`${this.apiUrl}/add`, reponse);
  }

  // Méthode pour récupérer une réponse par son ID
  getResponseById(id: number): Observable<ReponseQuestion> {
    return this.http.get<ReponseQuestion>(`${this.apiUrl}/getReponse/${id}`);
  }
  // Méthode pour mettre à jour une réponse
  updateReponse(id: number, reponse: ReponseQuestion): Observable<ReponseQuestion> {
    return this.http.put<ReponseQuestion>(`${this.apiUrl}/update/${id}`, reponse);
  }

  getResponsesByQuestionId(questionId: number): Observable<ReponseQuestion[]> {
    return this.http.get<ReponseQuestion[]>(`${this.apiUrl}/getResponsesByQuestionId/${questionId}`);
  }
  // Méthode pour supprimer une réponse
  deleteReponse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
