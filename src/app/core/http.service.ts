import { API_URL_Mock, API_URL } from './api-url-map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, timeout } from 'rxjs';
import { CONSOLE } from './encap-console';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private isUseMockData = !environment.production;

  constructor(private http: HttpClient) {}

  post<T>(urlMapName: string, reqData: any): Observable<T> {
    const urlPath = this.getUrl(urlMapName);
    CONSOLE.log('[HttpService: post] urlPath', urlPath);
    const timeoutMinute = 5;
    return this.isUseMockData
      ? this.http.get<T>(urlPath).pipe(timeout(timeoutMinute * 60 * 1000))
      : this.http.post<T>(urlPath, reqData).pipe(timeout(timeoutMinute * 60 * 1000));
  }

  getUrl(urlMapName: string): string {
    return this.isUseMockData ? API_URL_Mock[urlMapName] : API_URL[urlMapName];
  }
}
