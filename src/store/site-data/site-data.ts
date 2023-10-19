import { SiteData } from '../../types/state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreSlice } from '../../const';
import { fetchOffersList } from '../api-actions';
import { OffersData } from '../../types/offers';

const initialState: SiteData = {
  offers: [],
  isDataLoaded: false,
};

export const siteData = createSlice({
  name: StoreSlice.SiteData,
  initialState,
  reducers: {
    updateOffers: (state, action: PayloadAction<OffersData[]>) => {
      state.offers = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersList.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOffersList.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchOffersList.rejected, (state) => {
        state.isDataLoaded = false;
      });
  },
});

export const {updateOffers} = siteData.actions;
