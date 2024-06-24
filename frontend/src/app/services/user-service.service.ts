
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../model/user';
import { CredentialsDto } from '@app/model/credentials-dto';
import { Page } from '@app/model/page.model';
import { ConfigService } from './config.service';


@Injectable()
export class UserService {


  constructor(private http: HttpClient, private router: Router, private configService: ConfigService) {
    
  }

  public findAll(page: number, size: number): Observable<Page<User>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<User>>(`${this.configService.apiUrl}/users/paginated`, { params });
  }

  public save(user: User): Observable<User> {
    return this.http.post<User>(`${this.configService.apiUrl}/users/addUser`, user).pipe(
      tap(response => {
        // Stockez les informations de l'utilisateur après une inscription réussie
        localStorage.setItem('currentUser', JSON.stringify(response));
      })
    );
  }

  public login(credentials: CredentialsDto): Observable<User> {
    return this.http.post<User>(`${this.configService.apiUrl}/username`, credentials).pipe(
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
    return this.http.delete<void>(`${this.configService.apiUrl}/users/${userId}`);
  }

  public update(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.configService.apiUrl}/users/${userId}`, user);
  }

  activateUser(userId: number): Observable<void> {
    return this.http.put<void>(`${this.configService.apiUrl}/users/${userId}/activate`, null);
  }

  deactivateUser(userId: number): Observable<void> {
    return this.http.put<void>(`${this.configService.apiUrl}/users/${userId}/deactivate`, null);
  }

  getCurrentUser(): User | null {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }
}
