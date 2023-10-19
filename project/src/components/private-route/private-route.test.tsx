import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import PrivateRoute from './private-route';
import history from '../../services/browser-history';
import { AppRoute, AuthorizationStatus, StoreSlice } from '../../const';

const user = {
  id: 1,
  name: 'Max',
  avatarUrl: 'img/user-1.jpg',
  isPro: false,
  email: 'max@gmail.com'
};


const mockStore = configureMockStore();

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render component for the public route, when a user is not authorized', () => {
    const store = mockStore({
      [StoreSlice.UserProcess]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: null
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login}
            element={<h1>Public Route</h1>} />
            <Route path='/private' element={
              <PrivateRoute >
                <h1>Private Route</h1>
              </PrivateRoute>
            }/>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();

  });

  it('should render component for the public route, when a user is authorized', () => {
    const store = mockStore({
      [StoreSlice.UserProcess]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userData: user
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login}
            element={<h1>Public Route</h1>} />
            <Route path='/private' element={
              <PrivateRoute >
                <h1>Private Route</h1>
              </PrivateRoute>
            }/>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
