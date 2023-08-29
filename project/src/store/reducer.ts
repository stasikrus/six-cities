import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from './action';
import { DEFAULT_CITY } from '../const';
import { offersData } from '../mocks/offers';

const initialState = {
  city: DEFAULT_CITY,
  offers: offersData
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    });
});

export {reducer};
