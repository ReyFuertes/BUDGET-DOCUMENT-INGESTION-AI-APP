import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="upload-container" 
         (drop)="onDrop($event)" 
         (dragover)="onDragOver($event)"
         (dragleave)="onDragLeave($event)"
         [class.drag-over]="isDragOver()">
      
      <div class="icon">📄</div>
      <h3>Upload Receipt</h3>
      <p>Drag & drop your receipt image here, or click to select</p>
      
      <input type="file" #fileInput (change)="onFileSelected($event)" accept="image/*" hidden>
      <button class="select-btn" (click)="fileInput.click()" [disabled]="isUploading()">
        {{ isUploading() ? 'Processing...' : 'Select File' }}
      </button>

      <div *ngIf="error()" class="error-msg">{{ error() }}</div>
    </div>
  `,
    styles: [`
    .upload-container {
      border: 2px dashed #ccc;
      border-radius: 12px;
      padding: 3rem;
      text-align: center;
      transition: all 0.3s ease;
      background: #f9f9f9;
      cursor: pointer;
      
      &.drag-over {
        border-color: #007bff;
        background: #eef7ff;
        transform: scale(1.02);
      }

      .icon { font-size: 3rem; margin-bottom: 1rem; }
      
      h3 { margin: 0 0 0.5rem; color: #333; }
      
      p { color: #666; margin-bottom: 1.5rem; }

      .select-btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 24px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;

        &:hover { background: #0056b3; }
        &:disabled { background: #ccc; cursor: not-allowed; }
      }

      .error-msg {
        color: #dc3545;
        margin-top: 1rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class FileUploadComponent {
    private api = inject(ApiService);

    isDragOver = signal(false);
    isUploading = signal(false);
    error = signal<string | null>(null);

    onDragOver(event: DragEvent) {
        event.preventDefault();
        this.isDragOver.set(true);
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        this.isDragOver.set(false);
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        this.isDragOver.set(false);
        if (event.dataTransfer?.files.length) {
            this.upload(event.dataTransfer.files[0]);
        }
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files?.length) {
            this.upload(input.files[0]);
        }
    }

    upload(file: File) {
        this.isUploading.set(true);
        this.error.set(null);

        this.api.uploadReceipt(file).subscribe({
            next: () => this.isUploading.set(false),
            error: (err) => {
                console.error(err);
                this.error.set('Failed to process receipt. Ensure Backend is running.');
                this.isUploading.set(false);
            }
        });
    }
}
