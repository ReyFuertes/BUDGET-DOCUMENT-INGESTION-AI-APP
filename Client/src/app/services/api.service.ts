import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Receipt } from '../models/receipt';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/receipts';

  receipts = signal<Receipt[]>([]);

  constructor() {
    this.fetchReceipts();
  }

  fetchReceipts() {
    this.http.get<Receipt[]>(this.baseUrl).subscribe(data => {
      this.receipts.set(data);
    });
  }

  uploadReceipt(file: File): Observable<Receipt> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Receipt>(`${this.baseUrl}/upload`, formData).pipe(
      tap(newReceipt => {
        this.receipts.update(current => [...current, newReceipt]);
      })
    );
  }

  downloadReport(): void {
    window.open(`${this.baseUrl}/export`, '_blank');
  }
}