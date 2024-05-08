import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mentor } from '@app/model/mentor.model';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private apiUrl = 'http://localhost:8080/mentors'; // Remplacez l'URL par celle de votre API

  constructor(private http: HttpClient) { }

  addMentor(mentor: Mentor): Observable<Mentor> {
    return this.http.post<Mentor>(`${this.apiUrl}/addMentor`, mentor);
  }

  getAllMentors(): Observable<Mentor[]> {
    return this.http.get<Mentor[]>(`${this.apiUrl}/allMentors`);
  }

  getMentorById(id: number): Observable<Mentor> {
    return this.http.get<Mentor>(`${this.apiUrl}/getMentor/${id}`);
  }

  updateMentor(id: number, mentor: Mentor): Observable<Mentor> {
    return this.http.put<Mentor>(`${this.apiUrl}/updateMentor/${id}`, mentor);
  }

  deleteMentor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteMentor/${id}`);
  }
}
