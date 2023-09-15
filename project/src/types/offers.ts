import { CITY } from "../const"

export type OffersData = {
  bedrooms: number
  city: City
  description: string
  goods: [string]
  host: Host
  id: number
  href: string
  images: [string]
  isFavorite: boolean
  isPremium: boolean
  location: Location
  maxAdults: number
  previewImage: string
  price: number
  rating: number
  title: string
  type: 'apartment' | 'room' | 'house' | 'hotel';
}

export type Host = {
  avatarUrl: string
  id: number
  isPro: boolean
  name: string
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
