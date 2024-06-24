// src/app/services/reponse-user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReponseUser } from '@app/model/reponse-user.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReponseUserService {

  

  constructor(private http: HttpClient, private configService: ConfigService ) {
   
  }

  public save(reponseUser: ReponseUser): Observable<ReponseUser> {
    return this.http.post<ReponseUser>(`${this.configService.apiUrl}/reponses/add`, reponseUser);
  }

  getUserResponses(userId: number): Observable<ReponseUser[]> {
    return this.http.get<ReponseUser[]>(`${this.configService.apiUrl}/reponses/user/${userId}`);
  }
}
