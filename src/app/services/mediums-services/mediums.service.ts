import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mediums } from './mediums';

@Injectable({
  providedIn: 'root'
})
export class MediumsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMediums(): Observable<Mediums[]> {
    return this.http.get<Mediums[]>(`${this.apiServerUrl}/mediums/all`);
  }

  public getMediumByID(mediumID: number): Observable<Mediums[]> {
    return this.http.get<Mediums[]>(`${this.apiServerUrl}/mediums/${mediumID}`)
  }

  public addMediums(medium: Mediums): Observable<Mediums> {
    return this.http.post<Mediums>(`${this.apiServerUrl}/mediums/add`, medium);
  }

  public updateMediums(medium: Mediums, mediumID: number): Observable<Mediums> {
    return this.http.put<Mediums>(`${this.apiServerUrl}/mediums/update/${mediumID}`, medium);
  }

  public deleteMediums(mediumID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/mediums/delete/${mediumID}`);
  }
  getMediumData(endLimit: number) {
    return this.http.get(`${environment.apiBaseUrl}/mediums/${endLimit}`).pipe(map(response => response));
  }
  public getMediumsPagination(limit: number, offset: number): Observable<Mediums[]> {
    return this.http.get<Mediums[]>(`${this.apiServerUrl}/mediums/pagination/${limit}/${offset}`);
  }
  public getMediumsByMediumName(mediumname: string): Observable<Mediums[]> {
    return this.http.get<Mediums[]>(`${this.apiServerUrl}/mediums/by_medium_name/${mediumname}`)
  }
}