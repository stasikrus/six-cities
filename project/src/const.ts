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

export const ERROR_MESSAGES = {
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'You are not logged in or you do not have permission to this page.',
  NOT_FOUND: 'Resource not found'
} as const;

export enum APIRoute {
  Offers = '/hotels',
  Favorites = '/favorite',
  Login = '/login',
  Logout = '/logout',
}

export enum AppRoute {
  Root = '/',
  Offer = '/offer/:id',
  Login = '/login',
  Favorites = '/favorites'
}

export enum CommentValidation {
  MinLength = 50,
  MaxLength = 300
}

export const CITY = [
  'Amsterdam',
  'Paris',
  'Cologne',
  'Brussels',
  'Hamburg',
  'Dusseldorf'
] as const;
