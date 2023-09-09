import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, hoverOffer, loadOffers, requireAuthorization, setDataLoadedStatus, storeComments } from './action';
import { DEFAULT_CITY } from '../const';
import { SortType, AuthorizationStatus } from '../const';
import { InitialStateType } from '../types/state';

const initialState: InitialStateType = {
  city: DEFAULT_CITY,
  offers: [],
  sorting: SortType.POPULAR,
  hoveredOffer: null,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: true,
  commentsMap: null
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
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(storeComments, (state, action) => {
      state.commentsMap = action.payload;
    });
});

export {reducer};
