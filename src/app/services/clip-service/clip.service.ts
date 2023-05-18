import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clip } from './clip';


@Injectable({
  providedIn: 'root'
})

export class ClipService {

  private headers = null;

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClip(): Observable<Clip[]> {
    return this.http.get<Clip[]>(`${this.apiServerUrl}/clip/all`);
  }

  public getClipByID(clipID: number): Observable<Clip[]> {
    return this.http.get<Clip[]>(`${this.apiServerUrl}/clip/${clipID}`)
  }

  public getLastClip(): Observable<Clip[]> {
    return this.http.get<Clip[]>(`${this.apiServerUrl}/clip/last`)
  }

  public addClip(clip: Clip): Observable<Clip> {
    return this.http.post<Clip>(`${this.apiServerUrl}/clip/add`, clip);
  }

  public updateClip(clipID: number, clip: Clip): Observable<Clip> {
    return this.http.put<Clip>(`${this.apiServerUrl}/clip/update/${clipID}`, clip);
  }

  public updateClipGroup(clipID: number, clip: Clip): Observable<Clip> {
    return this.http.put<Clip>(`${this.apiServerUrl}/clip/update/group/${clipID}`, clip);
  }

  public removeClipFromGroup(clipID: number, clip: Clip): Observable<Clip> {
    return this.http.put<Clip>(`${this.apiServerUrl}/clip/update/remove/${clipID}`, clip);
  }

  public deleteClip(clipID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/clip/delete/${clipID}`);
  }

  public getClipPagination(limit: number, offset: number): Observable<Clip[]> {
    return this.http.get<Clip[]>(`${this.apiServerUrl}/clip/pagination/${limit}/${offset}`);
  }

  //GET data from time
  public getTimeNews(clipUrl: string) {
    return this.http.post(`${this.apiServerUrl}/timeMK/timeNews/`, { "webUrl": clipUrl })
  }

  //GET data from grid
  public getGridNews(clipUrl: string) {
    return this.http.post(`${this.apiServerUrl}/grid/gridMKNews/`, { "webUrl": clipUrl })
  }
  public gridArticles(clipUrl: string) {
    return this.http.post(`${this.apiServerUrl}/grid/gridArticles/`, { "webUrl": clipUrl })
  }
  //GET data from Fax.Al
  public getFaxAlNews(clipUrl: string) {
    return this.http.post(`${this.apiServerUrl}/faxal/faxalNews/`, { "webUrl": clipUrl })
  }

  //GET data from Vesti.mk
  public getVestiNews(clipUrl: string) {
    return this.http.post(`${this.apiServerUrl}/vesti/vestiNews/`, { "webUrl": clipUrl })
  }

  //GET screenshoot
  public getscreenShot(url: string, file_path:string) {
    return this.http.post(`${this.apiServerUrl}/clip/screenShot`, { "webUrl": url, "file_path": file_path })
  }

}