import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tenders } from './tenders';
import { JSONdoc} from './jsondoc';

@Injectable({
  providedIn: 'root'
})
export class TendersService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getTenders(): Observable<Tenders[]> {
    return this.http.get<Tenders[]>(`${this.apiServerUrl}/tenders/all`);
  }

  public getTenderByID(tenderID: number): Observable<Tenders[]> {
    return this.http.get<Tenders[]>(`${this.apiServerUrl}/tenders/${tenderID}`)
  }

  public addTender(tender: Tenders): Observable<Tenders> {
    return this.http.post<Tenders>(`${this.apiServerUrl}/tenders/add`, tender);
  }

  public updateTender(tenderID: number, tender: Tenders): Observable<Tenders> {
    return this.http.put<Tenders>(`${this.apiServerUrl}/tenders/update/${tenderID}`, tender);
  }

  public deleteTender(tenderID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tenders/delete/${tenderID}`);
  }


  public getSingleTender(tenderStr: string,tenderId: string, tender: Tenders[]):Observable<Tenders> {
    return this.http.post<Tenders>(`${this.apiServerUrl}/tenders/getSingleTender/${tenderStr}/${tenderId}`, tender);
  }

  //Test
  public getJsonTenders():Observable<JSONdoc[]> {
    return this.http.get<JSONdoc[]>(`${this.apiServerUrl}/tenders/getJSON`);
  }
  public getTendersPagination(limit: number, offset: number): Observable<Tenders[]> {
    return this.http.get<Tenders[]>(`${this.apiServerUrl}/tenders/pagination/${limit}/${offset}`);
  }
  public getTenderByTenderSubject(tenderSubject: string): Observable<Tenders[]> {
    return this.http.get<Tenders[]>(`${this.apiServerUrl}/tenders/by_tender_subject/${tenderSubject}`)
  }


  // public getSingleTender(tenderId: string): Observable<void> {
  //   return this.http.post<void>(`${this.apiServerUrl}/tenders/getSingleTender/${tenderId}`);
  // }

  // public activeTenders(): Observable<void> {
  //   return this.http.post<void>(`${this.apiServerUrl}/tenders/ePazarActiveTenders`);
  // }
}
