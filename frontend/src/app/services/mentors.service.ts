import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mentor } from '@app/model/mentor.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
 
  constructor(private http: HttpClient, private configService: ConfigService) { }

  addMentor(mentor: Mentor): Observable<Mentor> {
    return this.http.post<Mentor>(`${this.configService.apiUrl}/mentors/add`, mentor);
  }

  getAllMentors(): Observable<Mentor[]> {
    return this.http.get<Mentor[]>(`${this.configService.apiUrl}/mentors`);
  }

  getMentorById(id: number): Observable<Mentor> {
    return this.http.get<Mentor>(`${this.configService.apiUrl}/mentors/${id}`);
  }

  updateMentor(id: number, mentor: Mentor): Observable<Mentor> {
    return this.http.put<Mentor>(`${this.configService.apiUrl}/mentors/${id}`, mentor);
  }

  deleteMentor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.apiUrl}/mentors/${id}`);
  }
}
