import { UserProcess } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { StoreSlice } from '../../const';
import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, loginAction, logout } from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userData: null,
};

export const userProcess = createSlice({
  name: StoreSlice.UserProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      });
  },
});
