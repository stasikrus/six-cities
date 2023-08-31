import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, hoverOffer } from './action';
import { DEFAULT_CITY } from '../const';
import { offersData } from '../mocks/offers';
import { SortType } from '../const';
import { InitialStateType } from '../types/state';

const initialState: InitialStateType = {
  city: DEFAULT_CITY,
  offers: offersData,
  sorting: SortType.POPULAR,
  hoveredOffer: null
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
    });
});

export {reducer};
