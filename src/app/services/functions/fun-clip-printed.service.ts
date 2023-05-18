import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FunClipPrinted } from './fun-clip-printed';

@Injectable({
  providedIn: 'root'
})
export class FunClipPrintedService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public fun_clips_printed(): Observable<FunClipPrinted[]> {
    console.log("in fun-clip-printed.service");


    return this.http.get<FunClipPrinted[]>(`${this.apiServerUrl}/func/fun_clips_printed`);
    }
}
