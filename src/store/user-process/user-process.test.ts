import { userProcess } from "./user-process";
import { AuthorizationStatus } from "../../const";
import { checkAuth, loginAction } from "../api-actions";

const userData = {
  avatarUrl: 'pic23.jpg',
  email: 'test@mail.ru',
  id: 53456,
  isPro: true,
  name: 'Test',
  token: 'frefer3454534ghbv4',
};

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
     .toEqual({
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userData: null,
     });
  });

  it('should fetch authorization status', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userData: null,
    };

    expect(userProcess.reducer(state, {type: checkAuth.rejected.type}))
      .toEqual({
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      });


    expect(userProcess.reducer(state, {type: checkAuth.fulfilled.type, payload: userData}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.AUTH,
        userData: userData,
      });
  });

  it('should login user', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      userData: null,
    };

    expect(userProcess.reducer(state, {type: loginAction.rejected.type}))
      .toEqual({
        ...state
      });

    expect(userProcess.reducer(state, {type: loginAction.fulfilled.type, payload: userData}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.AUTH,
        userData: userData,
      })
  });
});
