import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, hoverOffer, storeComments, updateOffers } from './action';
import { DEFAULT_CITY } from '../const';
import { SortType, AuthorizationStatus } from '../const';
import { InitialStateType } from '../types/state';
import { fetchOffersList, checkAuth, loginAction } from './api-actions';

const initialState: InitialStateType = {
  city: DEFAULT_CITY,
  offers: [],
  sorting: SortType.POPULAR,
  hoveredOffer: null,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
  commentsMap: null,
  userData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(changeSort, (state, action) => {
      state.sorting = action.payload.filter;
    })
    .addCase(hoverOffer, (state, action) => {
      state.hoveredOffer = action.payload.id;
    })
    .addCase(fetchOffersList.pending, (state) => {
      state.isDataLoaded = true;
    })
    .addCase(fetchOffersList.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = false;
    })
    .addCase(fetchOffersList.rejected, (state) => {
      state.isDataLoaded = false;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.authorizationStatus = AuthorizationStatus.AUTH;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    })
    .addCase(storeComments, (state, action) => {
      state.commentsMap = action.payload;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.AUTH;
      state.userData = action.payload;
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    })
    .addCase(updateOffers, (store, action) => {
      store.offers = action.payload;
    });
});

export {reducer};
