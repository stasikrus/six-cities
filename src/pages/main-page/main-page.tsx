import HeaderNav from '../../components/header-nav/header-nav';
import ListOfCities from '../../components/list-of-cities/list-of-cities';
import SortingList from '../../components/sorting-list/sorting-list';
import OfferList from '../../components/offers-list/offers-list';
import { useAppSelector } from '../../hooks';
import { getFilteredOffers, getSelectedCity, getFilteredOffersByCity } from '../../store/selectors';
import MapComponent from '../../components/map/map';
import { EmptyList } from '../../components/empty-list/empty-list';

function MainPage(): JSX.Element {

  const filteredOffers = useAppSelector(getFilteredOffers);
  const filtredOffersByCity = useAppSelector(getFilteredOffersByCity);
  const selectedCity = useAppSelector(getSelectedCity);
  const isEmpty = filteredOffers.length === 0;

  return (
    <div className="page page--gray page--main">
      <HeaderNav />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ListOfCities />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {isEmpty ? <EmptyList city={selectedCity} /> : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {filteredOffers.length} places to stay in {selectedCity}
                </b>
                <SortingList />
                <div className="cities__places-list places__list tabs__content">
                  <OfferList offers={filteredOffers} isNearOffer={false} />
                </div>
              </section>)}
            <div className="cities__right-section">
              <section className="cities__map map">
                {!isEmpty && <MapComponent points={filtredOffersByCity} heightMap={754} />}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
