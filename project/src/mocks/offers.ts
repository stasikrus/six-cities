import { OffersData } from '../types/offers';

export const offersData: OffersData[] = [
  {
    id: 1,
    href: '#',
    img: 'img/apartment-01.jpg',
    price: 120,
    name: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    premium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198
    },
    city: 'Amsterdam',
  },
  {
    id: 2,
    href: '#',
    img: 'img/apartment-01.jpg',
    price: 80,
    name: 'Wood and stone place',
    type: 'Private room',
    premium: false,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198
    },
    city: 'Amsterdam',
  },
  {
    id: 3,
    href: '#',
    img: 'img/apartment-02.jpg',
    price: 132,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    premium: false,
    location: {
      latitude: 48.85833478555735,
      longitude: 2.294416925129237
    },
    city: 'Paris',
  },
];
