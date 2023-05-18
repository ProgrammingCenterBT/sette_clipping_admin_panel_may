import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Roles } from './roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.apiServerUrl}/roles/all`);
  }

  public getRoleByID(roleID: number): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.apiServerUrl}/roles/${roleID}`)
  }

  public addRoles(role: Roles): Observable<Roles> {
    return this.http.post<Roles>(`${this.apiServerUrl}/roles/add`, role);
  }

  public updateRoles(role: Roles, roleID: number): Observable<Roles> {
    return this.http.put<Roles>(`${this.apiServerUrl}/roles/update/${roleID}`, role);
  }

  public deleteRoles(roleID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/roles/delete/${roleID}`);
  }
}
