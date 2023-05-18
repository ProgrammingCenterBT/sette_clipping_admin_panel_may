import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TenderTags } from '../tender-tags-services/tenderTags';
import { NotificationTags } from './notificationTags';

@Injectable({
  providedIn: 'root'
})
export class NotificationTagsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getNotificationTags(): Observable<NotificationTags[]> {
    return this.http.get<NotificationTags[]>(`${this.apiServerUrl}/notification-tags/all`);
  }

  public addNotificationTag(notificationTag: NotificationTags): Observable<NotificationTags> {
    return this.http.post<NotificationTags>(`${this.apiServerUrl}/notification-tags/add`, notificationTag);
  }

  public updateNotificationTag(notificationTag: NotificationTags): Observable<NotificationTags> {
    return this.http.put<NotificationTags>(`${this.apiServerUrl}/notification-tags/update`, notificationTag);
  }

  public deleteNotificationTag(notificationTagID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/notification-tags/delete/${notificationTagID}`);
  }
}
