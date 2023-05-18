import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tagsCategories } from './tagsCategories';

@Injectable({
  providedIn: 'root'
})
export class TagsCategoriesService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getTagsCategories(): Observable<tagsCategories[]> {
    return this.http.get<tagsCategories[]>(`${this.apiServerUrl}/tagsCategories/all`);
  }

  public addTagsCategories(tag: tagsCategories): Observable<tagsCategories> {
    return this.http.post<tagsCategories>(`${this.apiServerUrl}/tagsCategories/add`, tag);
  }

  public updateTagsCategories(tag: tagsCategories): Observable<tagsCategories> {
    return this.http.put<tagsCategories>(`${this.apiServerUrl}/tagsCategories/update`, tag);
  }

  public deleteTagsCategories(tagID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tagsCategories/delete/${tagID}`);
  }
}