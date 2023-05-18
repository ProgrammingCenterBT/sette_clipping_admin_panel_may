import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FunClip } from './fun-clip';

@Injectable({
  providedIn: 'root'
})
export class FunClipService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public fun_clips(): Observable<FunClip[]> {
    return this.http.get<FunClip[]>(`${this.apiServerUrl}/func/fun_clips`);
  }
}