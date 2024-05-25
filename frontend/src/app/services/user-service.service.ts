// src/app/services/user-service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../model/user';
import { CredentialsDto } from '@app/model/credentials-dto';

@Injectable()
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.usersUrl = 'http://localhost:8080';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}/users/allUsers`);
  }

  public save(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}/users/addUser`, user).pipe(
      tap(response => {
        // Stockez les informations de l'utilisateur après une inscription réussie
        localStorage.setItem('currentUser', JSON.stringify(response));
      })
    );
  }

  public login(credentials: CredentialsDto): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}/username`, credentials).pipe(
      tap(response => {
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/profile']);
        }
        // Stockez les informations de l'utilisateur après une connexion réussie
        localStorage.setItem('currentUser', JSON.stringify(response));
      })
    );
  }

  public delete(userId: number) {
    return this.http.delete<void>(`${this.usersUrl}/users/delete/${userId}`);
  }

  public update(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/users/update/${userId}`, user);
  }

  activateUser(userId: number): Observable<void> {
    return this.http.put<void>(`${this.usersUrl}/users/${userId}/activate`, null);
  }

  deactivateUser(userId: number): Observable<void> {
    return this.http.put<void>(`${this.usersUrl}/users/${userId}/deactivate`, null);
  }
}
