import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Authors } from './authors';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAuthors(): Observable<Authors[]> {
    return this.http.get<Authors[]>(`${this.apiServerUrl}/authors/all`);
  }

  public getAuthorByID(authorID: number): Observable<Authors[]> {
    return this.http.get<Authors[]>(`${this.apiServerUrl}/authors/${authorID}`)
  }

  public addAuthors(author: Authors): Observable<Authors> {
    return this.http.post<Authors>(`${this.apiServerUrl}/authors/add`, author);
  }

  public updateAuthors(author: Authors, authorID: number): Observable<Authors> {
    return this.http.put<Authors>(`${this.apiServerUrl}/authors/update/${authorID}`, author);
  }

  public deleteAuthors(authorID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/authors/delete/${authorID}`);
  }

  public getAuthorsPagination(limit: number, offset: number): Observable<Authors[]> {
    return this.http.get<Authors[]>(`${this.apiServerUrl}/authors/pagination/${limit}/${offset}`);
  }
  public getAuthorByFullName(fullname: string): Observable<Authors[]> {
    return this.http.get<Authors[]>(`${this.apiServerUrl}/authors/by_full_name/${fullname}`)
  }
}