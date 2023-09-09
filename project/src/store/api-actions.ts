import { AppDispatch, State } from '../types/state';
import { OffersData } from '../types/offers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import { APIRoute } from '../const';
import { loadOffers, setDataLoadedStatus, storeComments } from './action';
import { UserComments } from '../types/comments';

export const fetchOffersList = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OffersData[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const appendUserComment = createAsyncThunk<
  void, { id: number; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/postComment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserComments[]>(`/comments/${id}`, { comment, rating });
    dispatch(storeComments(data));
  }
);
