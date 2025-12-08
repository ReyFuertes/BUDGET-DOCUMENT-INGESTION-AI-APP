import { createAction, props } from '@ngrx/store';
import { Receipt } from '../../models/receipt';

export const loadReceipts = createAction('[Receipts] Load Receipts');
export const loadReceiptsSuccess = createAction(
  '[Receipts] Load Receipts Success',
  props<{ receipts: Receipt[] }>()
);
export const loadReceiptsFailure = createAction(
  '[Receipts] Load Receipts Failure',
  props<{ error: any }>()
);

export const uploadReceipt = createAction(
  '[Receipts] Upload Receipt',
  props<{ file: File }>()
);
export const uploadReceiptSuccess = createAction(
  '[Receipts] Upload Receipt Success',
  props<{ receipt: Receipt }>()
);
export const uploadReceiptFailure = createAction(
  '[Receipts] Upload Receipt Failure',
  props<{ error: any }>()
);
