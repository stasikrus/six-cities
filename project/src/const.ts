export const SortType = {
  PRICE_TO_HIGH: 'Price: low to high',
  PRICE_TO_LOW: 'Price: high to low',
  TOP_RATED: 'Top rated first',
  POPULAR: 'Popular'
} as const;

export const DEFAULT_CITY = 'Amsterdam';

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN'
} as const;

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
}

export enum AppRoute {
  Root = '/',
  Offer = '/offer/:id',
}

export const CITY = [
  'Amsterdam',
  'Paris',
  'Cologne',
  'Brussels',
  'Hamburg',
  'Dusseldorf'
] as const;
