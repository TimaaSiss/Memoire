import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/cours.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/cours`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/cours/${id}`);
  }

  getCoursesByMentor(mentorId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/cours/mentor/${mentorId}`);
  }

  // Ajouter une méthode pour récupérer les cours associés à une formation
  getCoursByFormation(formationId: number) :Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/cours/formation/${formationId}`);
  }
  
  addCourse(mentorId: number, newCourse: Course, formationId: number): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/formations/${formationId}/cours`, newCourse);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/cours/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cours/${id}`);
  }
}
