import { createAction } from '@reduxjs/toolkit';
import { OffersData, OffersDataCityName } from '../types/offers';
import { SortingType, HoverOfferType } from '../types/state';
import { UserComments } from '../types/comments';

export const changeCity = createAction<{city: OffersDataCityName}>('user/changeCity');
export const changeSort = createAction<{filter: SortingType}>('user/changeSort');
export const hoverOffer = createAction<{id: HoverOfferType}>('user/hoverOffer');
export const storeComments = createAction<UserComments[]>('data/storeComments');
export const updateOffers = createAction<OffersData[]>('user/updateOffers');
