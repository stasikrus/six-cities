import { siteProcess, changeCity, changeSort, hoverOffer} from './site-process';
import { DEFAULT_CITY } from '../../const';
import { SortType, CITY } from '../../const';
import { SiteProcess } from '../../types/state';

describe('Reducer: siteProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(siteProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        city: DEFAULT_CITY,
        sorting: SortType.POPULAR,
        hoveredOffer: null
      })
  })

  it('should set city by a given name', () => {
    const state: SiteProcess = {
      city: DEFAULT_CITY,
      sorting: SortType.POPULAR,
      hoveredOffer: null
    };

    expect(siteProcess.reducer(state, changeCity({city: CITY[1]})))
     .toEqual({
      ...state,
      city: CITY[1]
     })
  });

  it('should set sorting by a given name', () => {
    const state: SiteProcess = {
      city: DEFAULT_CITY,
      sorting: SortType.POPULAR,
      hoveredOffer: null
    };

    expect(siteProcess.reducer(state, changeSort({filter: SortType.PRICE_TO_HIGH})))
      .toEqual({
        ...state,
        sorting: SortType.PRICE_TO_HIGH
      })
  });

  it('should set hoveredOffer by a given ID', () => {
    const state: SiteProcess = {
      city: DEFAULT_CITY,
      sorting: SortType.POPULAR,
      hoveredOffer: null
    };

    expect(siteProcess.reducer(state, hoverOffer({id: 2})))
      .toEqual({
        ...state,
        hoveredOffer: 2
      })
  });
});
