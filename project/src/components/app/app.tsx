import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import LoginPage from '../../pages/login-page/login-page';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import Spinner from '../spinner/spinner';
import { useAppSelector } from '../../hooks';
import history from '../../services/browser-history';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import { getIsDataLoading } from '../../store/selectors';

function App(): JSX.Element {
  const isDataLoaded = useAppSelector(getIsDataLoading);

  if (isDataLoaded) {
    return (
      <Spinner />
    );
  }

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path={AppRoute.Root} >
          <Route index element={<MainPage />} />
        </Route>
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>

  );
}

export default App;
