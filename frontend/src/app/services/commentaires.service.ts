import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire } from '@app/model/commentaires.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {


  constructor(private http: HttpClient, private configService: ConfigService) { }

  getCommentaire(id: number): Observable<Commentaire> {
    return this.http.get<Commentaire>(`${this.configService.apiUrl}/commentaires/${id}`);
  }

  getCommentairesByCarriereId(carriereId: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.configService.apiUrl}/carrieres/${carriereId}`);
  }
  getCommentairesByFormationId(formationId: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.configService.apiUrl}/formations/${formationId}`);
  }

  getAllCommentaires(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.configService.apiUrl}/commentaires`);
  }

  addCommentaire(commentaire: Commentaire): Observable<Commentaire> {
    return this.http.post<Commentaire>(`${this.configService.apiUrl}/commentaires`, commentaire);
  }

  updateCommentaire(id: number, commentaire: Commentaire): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.configService.apiUrl}/commentaires/${id}`, commentaire);
  }

  deleteCommentaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.apiUrl}/commentaires/delete/${id}`);
  }
}
