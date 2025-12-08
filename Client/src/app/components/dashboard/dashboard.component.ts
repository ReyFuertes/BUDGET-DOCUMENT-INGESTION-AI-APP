import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { loadReceipts } from '../../store/receipts/receipt.actions';
import { selectAllReceipts } from '../../store/receipts/receipt.selectors';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    private store = inject(Store);
    private api = inject(ApiService); // Kept for downloadReport for now, or move download to effects? User only asked for store in dash/upload. Download is a simple window.open, maybe fine in component or service.

    receipts = this.store.selectSignal(selectAllReceipts);

    ngOnInit() {
        this.store.dispatch(loadReceipts());
    }

    download() {
        this.api.downloadReport();
    }
}
