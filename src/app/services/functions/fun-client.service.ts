import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FunClients } from './fun-clients';

@Injectable({
  providedIn: 'root'
})
export class FunClientService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public fun_clients(): Observable<FunClients[]> {

    return this.http.get<FunClients[]>(`${this.apiServerUrl}/func/fun_clients`);
  }
}
