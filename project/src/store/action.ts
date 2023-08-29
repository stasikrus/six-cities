import { createAction } from '@reduxjs/toolkit';
import { OffersDataCityName } from '../types/offers';

export const changeCity = createAction<{city: OffersDataCityName}>('user/changeCity');
