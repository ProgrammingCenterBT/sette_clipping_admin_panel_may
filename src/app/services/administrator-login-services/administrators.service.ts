import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrators } from './administrators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AdministratorsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAdministrators(): Observable<Administrators[]> {
    return this.http.get<Administrators[]>(`${this.apiServerUrl}/administrators/all`);
  }

  public addAdministrators(administrator: Administrators): Observable<Administrators> {
    return this.http.post<Administrators>(`${this.apiServerUrl}/administrators/add`, administrator);
  }

  public updateAdministrators(adminID: number, administrator: Administrators): Observable<Administrators> {
    return this.http.put<Administrators>(`${this.apiServerUrl}/administrators/update/${adminID}`, administrator);
  }

  public deleteAdministrators(administratorID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/administrators/delete/${administratorID}`);
  }
}
