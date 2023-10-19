import { render, screen } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import OfferPage from './offer-page';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SortType, CITY, StoreSlice, AuthorizationStatus, APIRoute } from '../../const';
import { api } from '../../store';
import MockAdapter from 'axios-mock-adapter';
import { waitFor } from '@testing-library/react';
import history from '../../services/browser-history';

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

const user = {
  id: 1,
  name: 'Max',
  avatarUrl: 'img/user-1.jpg',
  isPro: false,
  email: 'max@gmail.com'
};

const mockOfferData = {
  city: {
    name: "Paris",
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  previewImage: "https://10.react.pages.academy/static/hotel/16.jpg",
  images: [
    "https://10.react.pages.academy/static/hotel/11.jpg",
    "https://10.react.pages.academy/static/hotel/1.jpg",
    "https://10.react.pages.academy/static/hotel/16.jpg",
    "https://10.react.pages.academy/static/hotel/17.jpg",
    "https://10.react.pages.academy/static/hotel/18.jpg",
    "https://10.react.pages.academy/static/hotel/19.jpg",
    "https://10.react.pages.academy/static/hotel/9.jpg",
    "https://10.react.pages.academy/static/hotel/10.jpg",
    "https://10.react.pages.academy/static/hotel/7.jpg",
    "https://10.react.pages.academy/static/hotel/20.jpg",
    "https://10.react.pages.academy/static/hotel/12.jpg",
    "https://10.react.pages.academy/static/hotel/4.jpg",
    "https://10.react.pages.academy/static/hotel/15.jpg",
    "https://10.react.pages.academy/static/hotel/3.jpg"
  ],
  title: "Canal View Prinsengracht",
  isFavorite: false,
  isPremium: true,
  rating: 4.7,
  type: "room",
  bedrooms: 1,
  maxAdults: 3,
  price: 265,
  goods: [
    "Laptop friendly workspace",
    "Washer",
    "Breakfast"
  ],
  host: {
    id: 25,
    name: "Angelina",
    isPro: true,
    avatarUrl: "img/avatar-angelina.jpg"
  },
  description: "I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!",
  location: {
    latitude: 48.846610000000005,
    longitude: 2.374499,
    zoom: 16
  },
  id: 1
};

const mockOffersNearData = [
  {
    city: {
      name: "Paris",
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    previewImage: "https://10.react.pages.academy/static/hotel/14.jpg",
    images: [
      "https://10.react.pages.academy/static/hotel/2.jpg",
      "https://10.react.pages.academy/static/hotel/20.jpg",
      "https://10.react.pages.academy/static/hotel/6.jpg",
      "https://10.react.pages.academy/static/hotel/1.jpg",
      "https://10.react.pages.academy/static/hotel/12.jpg",
      "https://10.react.pages.academy/static/hotel/3.jpg",
      "https://10.react.pages.academy/static/hotel/18.jpg",
      "https://10.react.pages.academy/static/hotel/13.jpg",
      "https://10.react.pages.academy/static/hotel/14.jpg",
      "https://10.react.pages.academy/static/hotel/15.jpg",
      "https://10.react.pages.academy/static/hotel/8.jpg",
      "https://10.react.pages.academy/static/hotel/9.jpg",
      "https://10.react.pages.academy/static/hotel/5.jpg",
      "https://10.react.pages.academy/static/hotel/7.jpg"
    ],
    title: "Tile House",
    isFavorite: false,
    isPremium: false,
    rating: 2.4,
    type: "house",
    bedrooms: 5,
    maxAdults: 6,
    price: 650,
    goods: [
      "Washer",
      "Laptop friendly workspace",
      "Breakfast",
      "Air conditioning",
      "Baby seat"
    ],
    host: {
      id: 25,
      name: "Angelina",
      isPro: true,
      avatarUrl: "img/avatar-angelina.jpg"
    },
    description: "A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.",
    location: {
      latitude: 48.84461,
      longitude: 2.374499,
      zoom: 16
    },
    id: 32
  },
  {
    city: {
      name: "Paris",
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    previewImage: "https://10.react.pages.academy/static/hotel/2.jpg",
    images: [
      "https://10.react.pages.academy/static/hotel/13.jpg",
      "https://10.react.pages.academy/static/hotel/3.jpg",
      "https://10.react.pages.academy/static/hotel/4.jpg",
      "https://10.react.pages.academy/static/hotel/9.jpg",
      "https://10.react.pages.academy/static/hotel/2.jpg",
      "https://10.react.pages.academy/static/hotel/18.jpg",
      "https://10.react.pages.academy/static/hotel/11.jpg",
      "https://10.react.pages.academy/static/hotel/8.jpg",
      "https://10.react.pages.academy/static/hotel/1.jpg",
      "https://10.react.pages.academy/static/hotel/14.jpg",
      "https://10.react.pages.academy/static/hotel/6.jpg",
      "https://10.react.pages.academy/static/hotel/17.jpg",
      "https://10.react.pages.academy/static/hotel/15.jpg",
      "https://10.react.pages.academy/static/hotel/16.jpg"
    ],
    title: "Waterfront with extraordinary view",
    isFavorite: false,
    isPremium: false,
    rating: 2.7,
    type: "house",
    bedrooms: 1,
    maxAdults: 7,
    price: 191,
    goods: [
      "Breakfast",
      "Laptop friendly workspace"
    ],
    host: {
      id: 25,
      name: "Angelina",
      isPro: true,
      avatarUrl: "img/avatar-angelina.jpg"
    },
    description: "This is a place for dreamers to reset, reflect, and create. Designed with a 'slow' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.",
    location: {
      latitude: 48.837610000000005,
      longitude: 2.364499,
      zoom: 16
    },
    id: 4
  },
];

const mockCommentsData = [
  {
    id: 1,
    user: {
      id: 14,
      isPro: true,
      name: "Corey",
      avatarUrl: "https://10.react.pages.academy/static/avatar/5.jpg"
    },
    rating: 5,
    comment: "The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.",
    date: "2023-08-30T06:52:02.181Z"
  }
];

const TEST_ID = 1;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: `${TEST_ID}` }),
}));

const mockStore = configureMockStore();

const store = mockStore({
  [StoreSlice.UserProcess]: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
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

const mockAPI = new MockAdapter(api);

mockAPI
  .onGet(`/hotels/${TEST_ID}`)
  .reply(200, mockOfferData);

mockAPI
  .onGet(`/hotels/${TEST_ID}/nearby`)
  .reply(200, mockOffersNearData);

mockAPI
  .onGet(`/comments/${TEST_ID}`)
  .reply(200, mockCommentsData);


describe('<OfferPage />',  () => {
  it('should render correctly', async () => {

    const fakeApp = (
      <Provider store={store}>
        <ReactRouterDom.BrowserRouter>
          <OfferPage />
        </ReactRouterDom.BrowserRouter>
      </Provider>
    );

    const { container } = render(fakeApp);
    expect(container.querySelector('.loader-container')).toBeInTheDocument();

    await waitFor(() => {
      expect(container.querySelector('.loader-container')).not.toBeInTheDocument();
      expect(screen.getByText(mockOfferData.title)).toBeInTheDocument();
      expect(screen.getByText('Premium')).toBeInTheDocument();
    });
  });

  it('should navigate to a new route on some event', async () => {
    history.push(`${APIRoute.Offers}/1`);

    const fakeApp = (
      <Provider store={store}>
        <ReactRouterDom.BrowserRouter>
          <OfferPage />
        </ReactRouterDom.BrowserRouter>
      </Provider>
    );

    const { container } = render(fakeApp);
    expect(container.querySelector('.loader-container')).toBeInTheDocument();

    await waitFor(() => {
      expect(container.querySelector('.loader-container')).not.toBeInTheDocument();
      expect(history.location.pathname).toBe(`${APIRoute.Offers}/1`);
      expect(screen.getByText(mockOfferData.title)).toBeInTheDocument();
    });
  });
});
