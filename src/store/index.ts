import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { checkAuth, fetchOffersList } from './api-actions';
import history from '../services/browser-history';
import { rootReducer } from './root-reducer';

export const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api, history
      },
    }),
});

store.dispatch(checkAuth());
store.dispatch(fetchOffersList());
