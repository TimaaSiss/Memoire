import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/cours.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.configService.apiUrl}/cours`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.configService.apiUrl}/cours/${id}`);
  }

  getCoursesByMentor(mentorId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.configService.apiUrl}/cours/mentor/${mentorId}`);
  }

  // Ajouter une méthode pour récupérer les cours associés à une formation
  getCoursesByFormation(formationId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.configService.apiUrl}/cours/formation/${formationId}`);
  }
  
  addCourse(mentorId: number, newCourse: Course, formationId: number): Observable<Course> {
    const url = `${this.configService.apiUrl}/cours/add/${mentorId}/${formationId}`;
    return this.http.post<Course>(url, newCourse);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.configService.apiUrl}/cours/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.apiUrl}/cours/${id}`);
  }

  getCourseCount(): Observable<number> {
    return this.http.get<number>(`${this.configService.apiUrl}/cours/count`);
  }
}
