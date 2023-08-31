import { CITY } from "../mocks/cities";

export type OffersData = {
  id: number;
  href: string;
  price: number;
  rating: number;
  title: string;
  isPremium: boolean;
  isFavorite: boolean;
  location: Location;
  previewImage: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  city: City
}

export type OffersDataCityName = typeof CITY[number];

export type City = {
  name: OffersDataCityName;
  location: OffersDataLocation;
}


export type OffersDataLocation = {
  latitude: number,
  longitude: number,
  zoom: number
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}
