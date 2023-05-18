import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bankruptcies } from './bankruptcies';

@Injectable({
  providedIn: 'root'
})
export class BankruptciesService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getBankruptcies(): Observable<Bankruptcies[]> {
    return this.http.get<Bankruptcies[]>(`${this.apiServerUrl}/bankruptcies/all`);
  }

  public getBankruptciesByID(bankruptcyID: number): Observable<Bankruptcies[]> {
    return this.http.get<Bankruptcies[]>(`${this.apiServerUrl}/bankruptcies/${bankruptcyID}`)
  }

  public addBankruptcies(bankruptcy: Bankruptcies): Observable<Bankruptcies> {
    return this.http.post<Bankruptcies>(`${this.apiServerUrl}/bankruptcies/add`, bankruptcy);
  }

  public updateBankruptcies(bankruptcy: Bankruptcies, bankruptcyID: number): Observable<Bankruptcies> {
    return this.http.put<Bankruptcies>(`${this.apiServerUrl}/bankruptcies/update/${bankruptcyID}`, bankruptcy);
  }

  public deleteBankruptcies(bankruptcyID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/bankruptcies/delete/${bankruptcyID}`);
  }

  public getBankruptciesPagination(limit: number, offset: number): Observable<Bankruptcies[]> {
    return this.http.get<Bankruptcies[]>(`${this.apiServerUrl}/bankruptcies/pagination/${limit}/${offset}`);
  }
  public getBankruptciesByBankruptcyName(bankruptcyName: string): Observable<Bankruptcies[]> {
    return this.http.get<Bankruptcies[]>(`${this.apiServerUrl}/bankruptcies/by_bankruptcy_name/${bankruptcyName}`)
  }
}
