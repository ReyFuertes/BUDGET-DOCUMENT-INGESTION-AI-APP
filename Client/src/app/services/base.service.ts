import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  protected http = inject(HttpClient);

  protected get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  protected post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }
}
