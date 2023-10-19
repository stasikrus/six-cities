import { StoreSlice } from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const';
import { SortType } from '../../const';
import { SiteProcess } from '../../types/state';
import { OffersDataCityName } from '../../types/offers';
import { SortingType, HoverOfferType } from '../../types/state';

const initialState: SiteProcess = {
  city: DEFAULT_CITY,
  sorting: SortType.POPULAR,
  hoveredOffer: null,
};

export const siteProcess = createSlice({
  name: StoreSlice.SiteProcess,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<{city: OffersDataCityName}>) => {
      state.city = action.payload.city;
    },
    changeSort: (state, action: PayloadAction<{filter: SortingType}>) => {
      state.sorting = action.payload.filter;
    },
    hoverOffer: (state, action: PayloadAction<{id: HoverOfferType}>) => {
      state.hoveredOffer = action.payload.id;
    },
  }
});

export const {changeCity, changeSort, hoverOffer} = siteProcess.actions;
