import { State } from '../types/state';
import { SortType } from '../const';
import { createSelector } from '@reduxjs/toolkit';

export const getDefaultOffers = (state: State) => state.offers;
export const getSelectedCity = (state: State) => state.city;
export const getActiveSorting = (state: State) => state.sorting;
export const getActiveHoverOffer = (state: State) => state.hoveredOffer;
export const getAuthorizationStatus = (state: State) => state.authorizationStatus;
export const getComments = (state: State) => state.commentsMap;
export const getUserLogin = (state: State): string | null | undefined => state.userData?.name;
export const getIsDataLoading = (state: State) => state.isDataLoaded;

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

export const getIsFavoriteById = createSelector(
  [getDefaultOffers, (_state, id) => <number> id],
  (offers, id) => {
    const offer = offers.find((item) => item.id === Number(id));
    return offer ? offer.isFavorite : null;
  }
);

