import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receipt } from '../models/receipt';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseService {
  private baseUrl = environment.baseUrl;

  getReceipts(): Observable<Receipt[]> {
    return this.get<Receipt[]>(this.baseUrl);
  }

  uploadReceipt(file: File): Observable<Receipt> {
    const formData = new FormData();
    formData.append('file', file);

    return this.post<Receipt>(`${this.baseUrl}/upload`, formData);
  }

  downloadReport(): void {
    window.open(`${this.baseUrl}/export`, '_blank');
  }
}