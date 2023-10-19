import { combineReducers } from '@reduxjs/toolkit';
import { StoreSlice } from '../const';
import { userProcess } from './user-process/user-process';
import { siteData } from './site-data/site-data';
import { siteProcess } from './site-process/site-process';

export const rootReducer = combineReducers({
  [StoreSlice.SiteData]: siteData.reducer,
  [StoreSlice.SiteProcess]: siteProcess.reducer,
  [StoreSlice.UserProcess]: userProcess.reducer
});

