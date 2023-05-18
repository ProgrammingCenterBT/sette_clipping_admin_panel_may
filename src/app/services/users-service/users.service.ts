import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiServerUrl}/users/all`);
  }

  public getUserByID(userID: number): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiServerUrl}/users/${userID}`)
  }

  public addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.apiServerUrl}/users/add`, user);
  }

  public updateUser(userID: number, user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiServerUrl}/users/update/${userID}`, user);
  }

  public deleteUser(userID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/users/delete/${userID}`);
  }
  public loginUser(user: Users): Observable<object> {
    return this.http.post<Users[]>(`${this.apiServerUrl}/users/login`, user);
  }
}
