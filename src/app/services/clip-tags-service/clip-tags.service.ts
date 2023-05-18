import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clipTags } from './clip-tags';

@Injectable({
  providedIn: 'root'
})
export class ClipTagsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClipTags(): Observable<clipTags[]> {
    return this.http.get<clipTags[]>(`${this.apiServerUrl}/clip-tags/all`);
  }

  public getClipTagByID(clipTagID: number): Observable<clipTags[]> {
    return this.http.get<clipTags[]>(`${this.apiServerUrl}/clip-tags/${clipTagID}`)
  }

  public addClipTag(clipTag: clipTags): Observable<clipTags> {
    return this.http.post<clipTags>(`${this.apiServerUrl}/clip-tags/add`, clipTag);
  }

  public updateClipTag(clipTagID: number, clipTag: clipTags): Observable<clipTags> {
    return this.http.put<clipTags>(`${this.apiServerUrl}/clip-tags/update/${clipTagID}`, clipTag);
  }

  public deleteClipTag(clipTagID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/clip-tags/delete/${clipTagID}`);
  }
}
