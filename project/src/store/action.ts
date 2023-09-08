import { createAction } from '@reduxjs/toolkit';
import { OffersDataCityName, OffersData } from '../types/offers';
import { SortingType, HoverOfferType, AuthorizationStatusType } from '../types/state';

export const changeCity = createAction<{city: OffersDataCityName}>('user/changeCity');
export const changeSort = createAction<{filter: SortingType}>('user/changeSort');
export const hoverOffer = createAction<{id: HoverOfferType}>('user/hoverOffer');
export const loadOffers = createAction<OffersData[]>('data/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');
export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');
