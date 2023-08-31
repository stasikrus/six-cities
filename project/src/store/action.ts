import { createAction } from '@reduxjs/toolkit';
import { OffersDataCityName } from '../types/offers';
import { SortingType, HoverOfferType } from '../types/state';

export const changeCity = createAction<{city: OffersDataCityName}>('user/changeCity');
export const changeSort = createAction<{filter: SortingType}>('user/changeSort');
export const hoverOffer = createAction<{id: HoverOfferType}>('user/hoverOffer');
