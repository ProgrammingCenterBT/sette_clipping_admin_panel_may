import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clientAdmin } from './client-admin';

@Injectable({
  providedIn: 'root'
})
export class ClientAdminService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClient(): Observable<clientAdmin[]> {
    return this.http.get<clientAdmin[]>(`${this.apiServerUrl}/clients/all`);
  }

  public getClientByID(clientID: number): Observable<clientAdmin[]> {
    return this.http.get<clientAdmin[]>(`${this.apiServerUrl}/clients/${clientID}`)
  }

  public addClient(client: clientAdmin): Observable<clientAdmin> {
    return this.http.post<clientAdmin>(`${this.apiServerUrl}/clients/add`, client);
  }

  public updateClient(client: clientAdmin, clientID: number): Observable<clientAdmin> {
    return this.http.put<clientAdmin>(`${this.apiServerUrl}/clients/update/${clientID}`, client);
  }

  public deleteClient(clientID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/clients/delete/${clientID}`);
  }

}
