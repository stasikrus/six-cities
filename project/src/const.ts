export const SortType = {
  PRICE_TO_HIGH: 'Price: low to high',
  PRICE_TO_LOW: 'Price: high to low',
  TOP_RATED: 'Top rated first',
  POPULAR: 'Popular'
} as const;

export const DEFAULT_CITY = 'Amsterdam';

export enum AppRoute {
  Root = '/'
}
