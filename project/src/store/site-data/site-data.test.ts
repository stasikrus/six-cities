import { siteData } from "./site-data";
import { fetchOffersList } from "../api-actions";

const offers = {
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

describe('Reducer: siteData', () => {
  it('without additional parameters should return initial state', () => {
    expect(siteData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        offers: [],
        isDataLoaded: false,
      });
  });

  it('should fetch offers', () => {
    const state = {
      offers: [],
      isDataLoaded: false,
    };

    expect(siteData.reducer(state, {type: fetchOffersList.pending.type}))
      .toEqual({
        ...state,
        isDataLoaded: true
      });

    expect(siteData.reducer(state, {type: fetchOffersList.fulfilled.type, payload: offers}))
      .toEqual({
        ...state,
        offers: offers
      });

    expect(siteData.reducer(state, {type: fetchOffersList.rejected.type}))
    .toEqual({
      ...state,
      isDataLoaded: false
    });
  })
});
