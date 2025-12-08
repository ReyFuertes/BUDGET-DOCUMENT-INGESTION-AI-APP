import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as ReceiptActions from './receipt.actions';

@Injectable()
export class ReceiptEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  loadReceipts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiptActions.loadReceipts),
      switchMap(() =>
        this.apiService.getReceipts().pipe(
          map((receipts) => ReceiptActions.loadReceiptsSuccess({ receipts })),
          catchError((error) => of(ReceiptActions.loadReceiptsFailure({ error })))
        )
      )
    )
  );

  uploadReceipt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiptActions.uploadReceipt),
      switchMap(({ file }) =>
        this.apiService.uploadReceipt(file).pipe(
          map((receipt) => ReceiptActions.uploadReceiptSuccess({ receipt })),
          catchError((error) => of(ReceiptActions.uploadReceiptFailure({ error })))
        )
      )
    )
  );
}
