import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReponseOpenAI } from '@app/model/openai';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReponseOpenAIService {

  

  constructor(private http: HttpClient, private configService: ConfigService) { }

  generateReponse(userId: number): Observable<ReponseOpenAI> {
    let params = new HttpParams().set('userId', userId.toString());
    return this.http.post<ReponseOpenAI>(`${this.configService.apiUrl}/api/openai/generate`, null, { params });
  }

  getReponsesByUserId(userId: number): Observable<ReponseOpenAI[]> {
    return this.http.get<ReponseOpenAI[]>(`${this.configService.apiUrl}/api/openai/response?userId=${userId}`);
  }
}
