import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReponseOpenAI } from '@app/model/openai';

@Injectable({
  providedIn: 'root'
})
export class ReponseOpenAIService {

  private apiUrl = 'http://localhost:8080/api/openai';

  constructor(private http: HttpClient) { }

  generateReponse(userId: number): Observable<ReponseOpenAI> {
    let params = new HttpParams().set('userId', userId.toString());
    return this.http.post<ReponseOpenAI>(`${this.apiUrl}/generate`, null, { params });
  }

  getReponsesByUserId(userId: number): Observable<ReponseOpenAI[]> {
    return this.http.get<ReponseOpenAI[]>(`${this.apiUrl}/response?userId=${userId}`);
  }
}
