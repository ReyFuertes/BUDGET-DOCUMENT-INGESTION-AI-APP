import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="dashboard">
      <div class="header">
        <h2>Your Receipts</h2>
        <button class="export-btn" (click)="download()" [disabled]="receipts().length === 0">
          📥 Download Excel Report
        </button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Merchant</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of receipts()">
              <td>{{ r.storeDate | date:'shortDate' }}</td>
              <td>{{ r.merchantName }}</td>
              <td>
                <div *ngFor="let i of r.items" class="item-row">
                  {{ i.description }} ({{ i.amount | currency }})
                </div>
              </td>
              <td class="total">{{ r.totalAmount | currency }}</td>
            </tr>
            <tr *ngIf="receipts().length === 0">
              <td colspan="4" class="empty-state">No receipts processed yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
    styles: [`
    .dashboard {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      margin-top: 2rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;

      h2 { margin: 0; font-size: 1.5rem; color: #1a1a1a; }
    }

    .export-btn {
      background: #10b981;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;

      &:hover { background: #059669; }
      &:disabled { background: #a7f3d0; cursor: default; }
    }

    .table-container {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      
      th {
        text-align: left;
        padding: 12px;
        background: #f8fafc;
        color: #64748b;
        font-weight: 600;
        border-bottom: 1px solid #e2e8f0;
      }

      td {
        padding: 12px;
        border-bottom: 1px solid #f1f5f9;
        vertical-align: top;
        color: #334155;
      }

      .item-row { font-size: 0.85em; color: #64748b; }
      .total { font-weight: 600; color: #0f172a; }
      .empty-state { text-align: center; color: #94a3b8; padding: 2rem; }
    }
  `]
})
export class DashboardComponent {
    private api = inject(ApiService);
    receipts = this.api.receipts;

    download() {
        this.api.downloadReport();
    }
}
