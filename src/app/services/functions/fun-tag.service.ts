import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FunTags } from './fun-tags';

@Injectable({
  providedIn: 'root'
})
export class FunTagService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public fun_tags(): Observable<FunTags[]> {

    return this.http.get<FunTags[]>(`${this.apiServerUrl}/func/fun_tags`);
  }


}
