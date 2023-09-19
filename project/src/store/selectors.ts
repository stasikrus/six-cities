import { State } from '../types/state';
import { SortType } from '../const';
import { StoreSlice } from '../const';
import { createSelector } from '@reduxjs/toolkit';

export const getDefaultOffers = ({[StoreSlice.SiteData]: SITE_DATA}: State) => SITE_DATA.offers;
export const getSelectedCity = ({[StoreSlice.SiteProcess]: SITE_PROCESS}: State) => SITE_PROCESS.city;
export const getActiveSorting = ({[StoreSlice.SiteProcess]: SITE_PROCESS}: State) => SITE_PROCESS.sorting;
export const getActiveHoverOffer = ({[StoreSlice.SiteProcess]: SITE_PROCESS}: State) => SITE_PROCESS.hoveredOffer;
export const getAuthorizationStatus = ({[StoreSlice.UserProcess]: USER_PROCESS}: State) => USER_PROCESS.authorizationStatus;
export const getUserLogin = ({[StoreSlice.UserProcess]: USER_PROCESS}: State): string | null | undefined => USER_PROCESS.userData?.name;
export const getIsDataLoading = ({[StoreSlice.SiteData]: SITE_DATA}: State) => SITE_DATA.isDataLoaded;

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

