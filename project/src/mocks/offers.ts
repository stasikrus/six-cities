import { OffersData } from '../types/offers';

export const offersData: OffersData[] = [
  {
    id: 1,
    href: '#',
    price: 200,
    rating: 4.4,
    title: 'Beautiful & luxurious apartment at great location',
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
    type: 'apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13
      }
    }
  },
  {
    id: 2,
    href: '#',
    price: 20,
    rating: 3.4,
    title: 'A apartment at great location beautiful',
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg',
    type: 'room',
    city: {
      name: 'Paris',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13
      }
    }
  },
  {
    id: 3,
    href: '#',
    price: 100,
    rating: 5.0,
    title: 'Great location apartment at great location',
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    type: 'house',
    city: {
      name: 'Paris',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13
      }
    }
  },
  {
    id: 4,
    href: '#',
    price: 100,
    rating: 3.2,
    title: 'Luxurious & beautiful apartment at great location',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/apartment-01.jpg',
    type: 'hotel',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13
      }
    }
  },
];
