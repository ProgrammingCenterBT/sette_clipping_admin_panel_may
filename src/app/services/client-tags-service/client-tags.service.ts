import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clientTags } from './client-tags';

@Injectable({
  providedIn: 'root'
})
export class ClientTagsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClientTags(): Observable<clientTags[]> {
    return this.http.get<clientTags[]>(`${this.apiServerUrl}/client-tags/all`);
  }

  public getClientTagByID(clientTagID: number): Observable<clientTags[]> {
    return this.http.get<clientTags[]>(`${this.apiServerUrl}/client-tags/${clientTagID}`)
  }

  public addClientTag(clientTag: clientTags): Observable<clientTags> {
    return this.http.post<clientTags>(`${this.apiServerUrl}/client-tags/add`, clientTag);
  }

  public updateClientTag(clientTagID: number, clientTag: clientTags): Observable<clientTags> {
    return this.http.put<clientTags>(`${this.apiServerUrl}/client-tags/update/${clientTagID}`, clientTag);
  }

  public deleteClientTag(clientTagID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/client-tags/delete/${clientTagID}`);
  }
}