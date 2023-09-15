import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createApi } from '../services/api';
import { checkAuth, fetchOffersList } from './api-actions';
import history from '../services/browser-history';

export const api = createApi();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api, history
      },
    }),
});

store.dispatch(checkAuth());
store.dispatch(fetchOffersList());
