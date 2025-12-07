import { Routes } from '@angular/router';
import { FileUploadComponent } from './Component/file-upload/file-upload.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'upload', component: FileUploadComponent }
];
