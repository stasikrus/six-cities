import { State } from '../types/state';
import { SortType } from '../const';
import { createSelector } from '@reduxjs/toolkit';

export const getDefaultOffers = (state: State) => state.offers;
export const getSelectedCity = (state: State) => state.city;
export const getActiveSorting = (state: State) => state.sorting;
export const getActiveHoverOffer = (state: State) => state.hoveredOffer;
export const getAuthorizationStatus = (state: State) => state.authorizationStatus;

export const getFilteredOffersByCity = createSelector(
  [getDefaultOffers, getSelectedCity],
  (offers, selectedCity) => offers.filter(({city}) => city.name === selectedCity)
);

export const getFilteredOffers = createSelector(
  [getFilteredOffersByCity, getActiveSorting],
  (filteredOffers, activeSort) => {
    switch(activeSort) {
      case SortType.PRICE_TO_HIGH:
        return [...filteredOffers].sort((a, b) => a.price - b.price);
      case SortType.PRICE_TO_LOW:
        return [...filteredOffers].sort((a, b) => b.price - a.price);
      default:
        return filteredOffers;
    }
  }
);
