import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FunMedium } from './fun-medium';

@Injectable({
  providedIn: 'root'
})
export class FunMediumService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public fun_mediums(): Observable<FunMedium[]> {
    return this.http.get<FunMedium[]>(`${this.apiServerUrl}/func/fun_mediums`);
  }
}