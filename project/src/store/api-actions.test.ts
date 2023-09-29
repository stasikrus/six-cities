import { Action } from 'redux';
import type { AxiosInstance } from 'axios';
import { State } from '../types/state';
import type { History } from 'history';

import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createApi } from '../services/api';
import { APIRoute } from '../const';
import { checkAuth } from './api-actions';


describe('Async actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('checkAuth should be fullfilled when server returns 200', async () => {
    const store = mockStore();

    mockApi
      .onGet(APIRoute.Login)
      .reply(200, {});
    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuth.pending.type,
      checkAuth.fulfilled.type
    ]);
  })

  it('checkAuth should be rejected when server returns 401', async () => {
    const store = mockStore();

    mockApi
      .onGet(APIRoute.Login)
      .reply(401, {});
    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuth.pending.type,
      checkAuth.rejected.type
    ]);
  })
})


