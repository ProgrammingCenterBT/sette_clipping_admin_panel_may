import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Permissions } from './permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPermissions(): Observable<Permissions[]> {
    return this.http.get<Permissions[]>(`${this.apiServerUrl}/permissions/all`);
  }

  public getPermissionByID(permissionID: number): Observable<Permissions[]> {
    return this.http.get<Permissions[]>(`${this.apiServerUrl}/permissions/${permissionID}`)
  }

  // public addPermissions(permission: Permissions): Observable<Permissions> {
  //   return this.http.post<Permissions>(`${this.apiServerUrl}/permissions/add`, permission);
  // }

  // public updatePermissions(permission: Permissions, permissionID: number): Observable<Permissions> {
  //   return this.http.put<Permissions>(`${this.apiServerUrl}/permissions/update/${permissionID}`, permission);
  // }

  // public deletePermissions(permissionID: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiServerUrl}/permissions/delete/${permissionID}`);
  // }
}
