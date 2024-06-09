import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire } from '@app/model/commentaires.model';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  private baseUrl = 'http://localhost:8080/commentaires';

  constructor(private http: HttpClient) { }

  getCommentaire(id: number): Observable<Commentaire> {
    return this.http.get<Commentaire>(`${this.baseUrl}/getComment/${id}`);
  }

  getCommentairesByCarriereId(carriereId: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.baseUrl}/carriere/${carriereId}`);
  }

  getAllCommentaires(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.baseUrl}/allComments`);
  }

  addCommentaire(commentaire: Commentaire): Observable<Commentaire> {
    return this.http.post<Commentaire>(`${this.baseUrl}/addComment`, commentaire);
  }

  updateCommentaire(id: number, commentaire: Commentaire): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.baseUrl}/update/${id}`, commentaire);
  }

  deleteCommentaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
