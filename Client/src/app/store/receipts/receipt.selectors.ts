import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReceiptState } from './receipt.reducer';

export const selectReceiptState = createFeatureSelector<ReceiptState>('receipts');

export const selectAllReceipts = createSelector(
  selectReceiptState,
  (state) => state.receipts
);

export const selectReceiptsLoading = createSelector(
  selectReceiptState,
  (state) => state.loading
);

export const selectReceiptsUploading = createSelector(
    selectReceiptState,
    (state) => state.uploading
  );

export const selectReceiptsError = createSelector(
  selectReceiptState,
  (state) => state.error
);
