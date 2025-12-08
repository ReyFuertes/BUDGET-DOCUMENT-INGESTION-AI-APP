import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule, FileUploadHandlerEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { uploadReceipt, uploadReceiptSuccess, uploadReceiptFailure } from '../../store/receipts/receipt.actions';
import { selectReceiptsUploading } from '../../store/receipts/receipt.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [CommonModule, FileUploadModule, ToastModule],
    providers: [MessageService],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
    private store = inject(Store);
    private actions$ = inject(Actions);
    private messageService = inject(MessageService);

    isUploading = this.store.selectSignal(selectReceiptsUploading);

    constructor() {
        this.actions$.pipe(
            ofType(uploadReceiptSuccess),
            takeUntilDestroyed()
        ).subscribe(() => {
            this.messageService.add({ 
                severity: 'success', 
                summary: 'Success', 
                detail: 'Receipt uploaded and processed successfully' 
            });
        });

        this.actions$.pipe(
            ofType(uploadReceiptFailure),
            takeUntilDestroyed()
        ).subscribe(({ error }) => {
            console.error(error);
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'Failed to process receipt. Ensure Backend is running.' 
            });
        });
    }

    onUpload(event: FileUploadHandlerEvent) {
        const file = event.files[0];
        if (!file) return;

        this.store.dispatch(uploadReceipt({ file }));
        event.files = []; // Clear the file input
    }
}
