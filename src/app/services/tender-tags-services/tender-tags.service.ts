import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TenderTags } from './tenderTags';

@Injectable({
  providedIn: 'root'
})
export class TenderTagsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getTenderTags(): Observable<TenderTags[]> {
    return this.http.get<TenderTags[]>(`${this.apiServerUrl}/tender-tags/all`);
  }

  public addTenderTag(tenderTag: TenderTags): Observable<TenderTags> {
    return this.http.post<TenderTags>(`${this.apiServerUrl}/tender-tags/add`, tenderTag);
  }

  public updateTenderTag(tenderTag: TenderTags): Observable<TenderTags> {
    return this.http.put<TenderTags>(`${this.apiServerUrl}/tender-tags/update`, tenderTag);
  }

  public deleteTenderTag(tenderTagID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tender-tags/delete/${tenderTagID}`);
  }
}