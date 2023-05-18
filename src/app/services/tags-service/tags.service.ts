import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tags } from './tags';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${this.apiServerUrl}/tags/all`);
  }

  public getTagByID(tagID: number): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${this.apiServerUrl}/tags/${tagID}`)
  }

  public addTags(tag: Tags): Observable<Tags> {
    return this.http.post<Tags>(`${this.apiServerUrl}/tags/add`, tag);
  }

  public updateTags(tag: Tags, tagID: number): Observable<Tags> {
    return this.http.put<Tags>(`${this.apiServerUrl}/tags/update/${tagID}`, tag);
  }

  public deleteTags(tagID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tags/delete/${tagID}`);
  }
  public searchTags(tagType: string, query: string, searchTagType: string, tags: string, page: number = 0, size: number = 20) {
    const params = new HttpParams()
      .append('type', tagType)
      .append('search', query)
      .append('searchTenderType', searchTagType)
      .append('tags', tags)
      .append('page', page.toString())
      .append('size', size.toString());
    //return this.http.get<any>(`${environment.apiUrl}/clip/search`, { params });
  }

  public getTagsPagination(limit: number, offset: number): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${this.apiServerUrl}/tags/pagination/${limit}/${offset}`);
  }
  public getTagsByTagName(tagname: string): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${this.apiServerUrl}/tags/by_tag_name/${tagname}`)
  }
}
