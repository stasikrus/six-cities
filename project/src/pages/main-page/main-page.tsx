import HeaderNav from '../../components/header-nav/header-nav';
import ListOfCities from '../../components/list-of-cities/list-of-cities';
import SortingList from '../../components/sorting-list/sorting-list';
import OfferList from '../../components/offers-list/offers-list';

function MainPage(): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <HeaderNav />
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ListOfCities />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {/* {filteredOffers.length} places to stay in {selectedCity} */}
              </b>
              <SortingList />
              <div className="cities__places-list places__list tabs__content">
                <OfferList />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {/* <Map
                  points={filteredOffersByCity}
                  heightMap={754}
                /> */}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
