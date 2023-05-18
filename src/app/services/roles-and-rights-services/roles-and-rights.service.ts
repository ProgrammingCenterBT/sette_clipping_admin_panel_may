import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RolesAndRights } from './roles-and-rights';

@Injectable({
  providedIn: 'root'
})
export class RolesAndRightsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getRolesAndRights(): Observable<RolesAndRights[]> {
    return this.http.get<RolesAndRights[]>(`${this.apiServerUrl}/rolesAndRights/all`);
  }

  public getRolesAndRightsByID(rolesAndRightsID: number): Observable<RolesAndRights[]> {
    return this.http.get<RolesAndRights[]>(`${this.apiServerUrl}/rolesAndRights/${rolesAndRightsID}`)
  }

  public addRolesAndRights(rolesAndRights: RolesAndRights): Observable<RolesAndRights> {
    return this.http.post<RolesAndRights>(`${this.apiServerUrl}/rolesAndRights/add`, rolesAndRights);
  }

  public updateRolesAndRights(rolesAndRights: RolesAndRights, rolesAndRightsID: number): Observable<RolesAndRights> {
    return this.http.put<RolesAndRights>(`${this.apiServerUrl}/rolesAndRights/update/${rolesAndRightsID}`, rolesAndRights);
  }

  public deleteRolesAndRights(rolesAndRightsID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/rolesAndRights/delete/${rolesAndRightsID}`);
  }
}