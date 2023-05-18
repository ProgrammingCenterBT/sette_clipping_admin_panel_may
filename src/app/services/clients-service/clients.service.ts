import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clients } from './clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllClients(): Observable<Clients[]> {
    return this.http.get<Clients[]>(`${this.apiServerUrl}/clients/all`);
  }
  public getClientsByID(clientTagID: number): Observable<Clients[]> {
    return this.http.get<Clients[]>(`${this.apiServerUrl}/clients/${clientTagID}`)
  }
  public sendEmailReport(clients: Clients): Observable<Clients> {
    return this.http.post<Clients>(`${this.apiServerUrl}/clients/create_client_report`, clients);
  }
  public getClientsPagination(limit: number, offset: number): Observable<Clients[]> {
    return this.http.get<Clients[]>(`${this.apiServerUrl}/clients/pagination/${limit}/${offset}`);
  }
  public getClientsByClientName(clientName: string): Observable<Clients[]> {
    return this.http.get<Clients[]>(`${this.apiServerUrl}/clients/by_client_name/${clientName}`)
  }
}