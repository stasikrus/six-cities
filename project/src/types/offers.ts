export type OffersData = {
  id: number;
  href: string;
  price: number;
  rating: number;
  title: string;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  city: {
    name: OffersDataCityName,
    location: OffersDataLocation
  }
}

export type OffersDataCityName = 'Amsterdam' | 'Paris' | 'Cologne' |'Brussels' |'Hamburg' |'Dusseldorf';

export type OffersDataLocation = {
  latitude: number,
  longitude: number,
  zoom: number
}
