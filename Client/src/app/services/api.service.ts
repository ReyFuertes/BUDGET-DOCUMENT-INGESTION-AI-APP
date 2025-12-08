import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Receipt } from '../models/receipt';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseService {
  private baseUrl = environment.baseUrl;

  receipts = signal<Receipt[]>([]);

  constructor() {
    super();
    this.fetchReceipts();
  }

  fetchReceipts() {
    this.get<Receipt[]>(this.baseUrl).subscribe(data => {
      this.receipts.set(data);
    });
  }

  uploadReceipt(file: File): Observable<Receipt> {
    const formData = new FormData();
    formData.append('file', file);

    return this.post<Receipt>(`${this.baseUrl}/upload`, formData).pipe(
      tap(newReceipt => {
        this.receipts.update(current => [...current, newReceipt]);
      })
    );
  }

  downloadReport(): void {
    window.open(`${this.baseUrl}/export`, '_blank');
  }
}