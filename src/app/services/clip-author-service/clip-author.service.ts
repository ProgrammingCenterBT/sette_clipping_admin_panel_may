import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClipAuthors } from './clip-authors';

@Injectable({
  providedIn: 'root'
})
export class ClipAuthorService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClipAuthors(): Observable<ClipAuthors[]> {
    return this.http.get<ClipAuthors[]>(`${this.apiServerUrl}/clip-authors/all`);
  }

  public getClipAuthorByID(clipAuthorID: number): Observable<ClipAuthors[]> {
    return this.http.get<ClipAuthors[]>(`${this.apiServerUrl}/clip-authors/${clipAuthorID}`)
  }

  public addClipAuthor(clipAuthor: ClipAuthors): Observable<ClipAuthors> {
    return this.http.post<ClipAuthors>(`${this.apiServerUrl}/clip-authors/add`, clipAuthor);
  }

  public updateClipAuthor(clipAuthorID: number, clipAuthor: ClipAuthors): Observable<ClipAuthors> {
    return this.http.put<ClipAuthors>(`${this.apiServerUrl}/clip-authors/update/${clipAuthorID}`, clipAuthor);
  }

  public deleteClipAuthor(clipAuthorID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/clip-authors/delete/${clipAuthorID}`);
  }
}
