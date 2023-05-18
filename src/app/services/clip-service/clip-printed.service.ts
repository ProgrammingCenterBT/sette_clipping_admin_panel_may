import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClipPrinted } from './clip-printed';

@Injectable({
  providedIn: 'root'
})
export class ClipPrintedService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClipPrinted(): Observable<ClipPrinted[]> {
    return this.http.get<ClipPrinted[]>(`${this.apiServerUrl}/clip-printed/all`);
  }

  public getClipPrintedByID(clipID: number): Observable<ClipPrinted[]> {
    return this.http.get<ClipPrinted[]>(`${this.apiServerUrl}/clip-printed/${clipID}`)
  }

  public addClipPrinted(clip: ClipPrinted): Observable<ClipPrinted> {
    return this.http.post<ClipPrinted>(`${this.apiServerUrl}/clip-printed/add`, clip);
  }

  public updateClipPrinted(clipID: number, clip: ClipPrinted): Observable<ClipPrinted> {
    return this.http.put<ClipPrinted>(`${this.apiServerUrl}/clip-printed/update/${clipID}`, clip);
  }

  public updateClipPrintedGroup(clipID: number, clip: ClipPrinted): Observable<ClipPrinted> {
    return this.http.put<ClipPrinted>(`${this.apiServerUrl}/clip-printed/update/group/${clipID}`, clip);
  }

  public removeClipPrintedFromGroup(clipID: number, clip: ClipPrinted): Observable<ClipPrinted> {
    return this.http.put<ClipPrinted>(`${this.apiServerUrl}/clip-printed/update/remove/${clipID}`, clip);
  }

  public deleteClipPrinted(clipID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/clip-printed/delete/${clipID}`);
  }
}
