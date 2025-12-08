import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FileUploadModule, FileUploadHandlerEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [CommonModule, FileUploadModule, ToastModule],
    providers: [MessageService],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
    private api = inject(ApiService);
    private messageService = inject(MessageService);

    onUpload(event: FileUploadHandlerEvent) {
        const file = event.files[0];
        if (!file) return;

        this.api.uploadReceipt(file).subscribe({
            next: () => {
                this.messageService.add({ 
                    severity: 'success', 
                    summary: 'Success', 
                    detail: 'Receipt uploaded and processed successfully' 
                });
            },
            error: (err) => {
                console.error(err);
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: 'Failed to process receipt. Ensure Backend is running.' 
                });
            }
        });
    }
}
