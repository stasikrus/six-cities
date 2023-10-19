import {render, screen, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import App from './app';
import history from '../../services/browser-history';
import { createApi } from '../../services/api';
import { APIRoute, AppRoute, AuthorizationStatus, CITY, SortType, StoreSlice} from '../../const';
import { api as ApiFavorites } from '../../store';

const user = {
  id: 1,
  name: 'Max',
  avatarUrl: 'img/user-1.jpg',
  isPro: false,
  email: 'max@gmail.com'
};

const offers = [
 {
  id: 1,
  price: 120,
  rating: 4.0,
  title: 'Offer 1',
  isPremium: true,
  isFavorite: true,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.846610000000005,
    longitude: 2.374499,
    zoom: 16
  },
  previewImage: 'img/1.jpg',
  description: 'Nice house',
  type: 'hotel',
  goods: ['dish washer', 'wi-fi'],
  bedrooms: 2,
  host: {
    id: 25,
    name: "Angelina",
    isPro: true,
    avatarUrl: "img/avatar-angelina.jpg"
  },
  maxAdults: 3,
  images: ['img/1.jpg', 'img/2.jpg', 'img/3.jpg']
 }
];

const api = createApi();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

mockAPI
  .onGet(`${APIRoute.Offers}/1`)
  .reply(200, offers[0]);

const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [StoreSlice.UserProcess]: {
    authorizationStatus: AuthorizationStatus.AUTH,
    userData: user
  },
  [StoreSlice.SiteProcess]: {
    sorting: SortType.POPULAR,
    city: CITY[1],
    hoveredOffer: null
  },
  [StoreSlice.SiteData]: {
    offers: offers,
    isDataLoaded: false,
  },
});

const fakeApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigates to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText(`1 places to stay in ${CITY[1]}`)).toBeInTheDocument();
    expect(screen.getByText(SortType.POPULAR, { selector: '.places__sorting-type' })).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(offers[0].title)).toBeInTheDocument();
  });

  it('should render "Login" when user navigates to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigates to "/favorites"', async () => {
    const mockAPI = new MockAdapter(ApiFavorites);

    mockAPI
     .onGet(APIRoute.Favorites)
     .reply(200, [offers[0]]);

    history.push(AppRoute.Favorites);

    const { container } = render(fakeApp);
    expect(container.querySelector('.loader-container')).toBeInTheDocument();

    await waitFor(() => {
      expect(container.querySelector('.loader-container')).not.toBeInTheDocument();
      expect(screen.getByText(offers[0].title)).toBeInTheDocument();
      expect(screen.getByText(offers[0].type)).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button--active');
      expect(screen.getByRole('img', { name: 'Place image' })).toHaveAttribute('src', offers[0].previewImage);
    });
  })

  it('should render "NotFound" when user navigates to "/not-exists"', () => {
    history.push('/not-exists');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  })
});
