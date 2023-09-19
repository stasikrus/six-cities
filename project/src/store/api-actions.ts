import { AppDispatch, State } from '../types/state';
import { OffersData } from '../types/offers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import { APIRoute } from '../const';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { saveToken, dropToken } from '../services/token';
import history from '../services/browser-history';

export const fetchOffersList = createAsyncThunk<OffersData[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OffersData[]>(APIRoute.Offers);
    return data;
  },
);

export const checkAuth = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    history.back();
    return data;
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
