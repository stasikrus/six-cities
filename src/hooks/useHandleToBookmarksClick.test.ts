import useHandleToBookmarksClick from './useHandleToBookmarksClick';
import { renderHook, act, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import createTestProvider from './testProvider';
import { AppRoute, AuthorizationStatus } from '../const';
import history from '../services/browser-history';
import { StoreSlice } from '../const';
import { updateOffers } from '../store/site-data/site-data';
import { api } from '../store';

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
   isFavorite: false,
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

jest.mock('../services/browser-history', () => ({
  push: jest.fn()
}));

jest.mock('../store', () => ({
  api: {
    post: jest.fn()
  }
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const mockStore = configureMockStore();

describe('useHandleToBookmarksClick', () => {
  it('should redirect to login if user is not authorized', () => {
    const store = mockStore({
      [StoreSlice.UserProcess]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: null
      },
      [StoreSlice.SiteData]: {
        offers: offers,
        isDataLoaded: true,
      },
    });

    const TestProvider = createTestProvider(store);

    const { result } = renderHook(() => useHandleToBookmarksClick({ id: 1 }), {
      wrapper: TestProvider
    });

    result.current();

    // проверяем, что был вызван редирект на страницу входа
    expect(history.push).toHaveBeenCalledWith(AppRoute.Login);
  });

  it('should add to bookmarks if user is authorized', async () => {
    const store = mockStore({
      [StoreSlice.UserProcess]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userData: user
      },
      [StoreSlice.SiteData]: {
        offers: offers,
        isDataLoaded: true,
      },
    });

    const TestProvider = createTestProvider(store);

    const { result } = renderHook(() => useHandleToBookmarksClick({ id: 1 }), {
      wrapper: TestProvider
    });

    act(() => {
      result.current();
    });

    console.log(mockDispatch.mock.calls);


    await waitFor(() => expect(api.post).toHaveBeenCalledWith(`/favorite/1/1`));

    expect(mockDispatch).toHaveBeenCalledWith(updateOffers(expect.any(Array)));

  });
});
