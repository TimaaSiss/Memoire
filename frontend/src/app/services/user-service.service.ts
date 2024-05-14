import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { CredentialsDto } from '@app/model/credentials-dto';

@Injectable()
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}/users/allUsers`);
  }

  public save(user: User) {
    return this.http.post<User>(`${this.usersUrl}/users/addUser`, user);
  }
  public login(credentials: CredentialsDto): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}/username`, credentials);
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