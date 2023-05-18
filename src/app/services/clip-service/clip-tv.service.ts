import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClipTv } from './clip-tv';

@Injectable({
  providedIn: 'root'
})
export class ClipTvService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClipTv(): Observable<ClipTv[]> {
    return this.http.get<ClipTv[]>(`${this.apiServerUrl}/clip-tv/all`);
  }

  public getClipTvByID(clipID: number): Observable<ClipTv[]> {
    return this.http.get<ClipTv[]>(`${this.apiServerUrl}/clip-tv/${clipID}`)
  }

  public addClipTv(clip: ClipTv): Observable<ClipTv> {
    return this.http.post<ClipTv>(`${this.apiServerUrl}/clip-tv/add`, clip);
  }

  public updateClipTv(clipID: number, clip: ClipTv): Observable<ClipTv> {
    return this.http.put<ClipTv>(`${this.apiServerUrl}/clip-tv/update/${clipID}`, clip);
  }

  public updateClipTvGroup(clipID: number, clip: ClipTv): Observable<ClipTv> {
    return this.http.put<ClipTv>(`${this.apiServerUrl}/clip-tv/update/group/${clipID}`, clip);
  }

  public removeClipTvFromGroup(clipID: number, clip: ClipTv): Observable<ClipTv> {
    return this.http.put<ClipTv>(`${this.apiServerUrl}/clip-tv/update/remove/${clipID}`, clip);
  }

  public deleteClipTv(clipID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/clip-tv/delete/${clipID}`);
  }
}
