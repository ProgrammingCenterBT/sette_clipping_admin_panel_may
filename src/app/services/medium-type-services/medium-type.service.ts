import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MediumType } from './mediumType';

@Injectable({
  providedIn: 'root'
})
export class MediumTypeService {
  private apiServerUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  public getMediumType(): Observable<MediumType[]> {
    return this.http.get<MediumType[]>(`${this.apiServerUrl}/mediumType/all`);
  }

  public addMediumType(mediumType: MediumType): Observable<MediumType> {
    return this.http.post<MediumType>(`${this.apiServerUrl}/mediumType/add`, mediumType);
  }

  public updateMediumType(mediumType: MediumType): Observable<MediumType> {
    return this.http.put<MediumType>(`${this.apiServerUrl}/mediumType/update`, mediumType);
  }

  public deleteMediumType(mediumTypeID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/mediumType/delete/${mediumTypeID}`);
  }

}
