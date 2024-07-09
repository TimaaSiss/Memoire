import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:8080/email/send'; // Adjust the URL according to your backend endpoint

  constructor(private http: HttpClient) { }

  sendEmail(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
