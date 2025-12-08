import { createReducer, on } from '@ngrx/store';
import { Receipt } from '../../models/receipt';
import * as ReceiptActions from './receipt.actions';

export interface ReceiptState {
  receipts: Receipt[];
  loading: boolean;
  uploading: boolean;
  error: any;
}

export const initialState: ReceiptState = {
  receipts: [],
  loading: false,
  uploading: false,
  error: null,
};

export const receiptReducer = createReducer(
  initialState,
  on(ReceiptActions.loadReceipts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReceiptActions.loadReceiptsSuccess, (state, { receipts }) => ({
    ...state,
    receipts,
    loading: false,
  })),
  on(ReceiptActions.loadReceiptsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ReceiptActions.uploadReceipt, (state) => ({
    ...state,
    uploading: true,
    error: null,
  })),
  on(ReceiptActions.uploadReceiptSuccess, (state, { receipt }) => ({
    ...state,
    receipts: [...state.receipts, receipt],
    uploading: false,
  })),
  on(ReceiptActions.uploadReceiptFailure, (state, { error }) => ({
    ...state,
    uploading: false,
    error,
  }))
);
