import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gridkeywords } from './gridkeywords';

@Injectable({
  providedIn: 'root'
})
export class GridkeywordsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getGridkeywords(): Observable<Gridkeywords[]> {
    return this.http.get<Gridkeywords[]>(`${this.apiServerUrl}/keywords/all`);
  }

  public addGridkeywords(keyword: Gridkeywords): Observable<Gridkeywords> {
    return this.http.post<Gridkeywords>(`${this.apiServerUrl}/keywords/add`, keyword);
  }

  public deleteGridkeyword(keywordID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/keywords/delete/${keywordID}`);
  }

}
