// src/app/services/reponse-user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReponseUser } from '@app/model/reponse-user.model';

@Injectable({
  providedIn: 'root'
})
export class ReponseUserService {

  private reponsesUrl: string;

  constructor(private http: HttpClient) {
    this.reponsesUrl = 'http://localhost:8080/reponses';
  }

  public save(reponseUser: ReponseUser): Observable<ReponseUser> {
    return this.http.post<ReponseUser>(`${this.reponsesUrl}/add`, reponseUser);
  }

  getUserResponses(userId: string): Observable<ReponseUser[]> {
    return this.http.get<ReponseUser[]>(`${this.reponsesUrl}/user/${userId}`);
  }
}
