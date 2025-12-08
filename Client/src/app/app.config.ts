import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { receiptReducer } from './store/receipts/receipt.reducer';
import { ReceiptEffects } from './store/receipts/receipt.effects';
import { environment } from '../environments/environment';
import { tokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimations(),
    providePrimeNG({ 
        theme: {
            preset: Aura
        }
    }),
    provideStore({ receipts: receiptReducer }),
    provideEffects([ReceiptEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production })
  ]
};
