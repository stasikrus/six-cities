import { useEffect, useState } from 'react';
import Spinner from '../../components/spinner/spinner';
import HeaderNav from '../../components/header-nav/header-nav';
import { api } from '../../store';
import { APIRoute } from '../../const';
import { OffersData } from '../../types/offers';
import FavoritesList from '../../components/favorites-list/favorites-list';

const FavoritesPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<OffersData[] | null>(null);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const {data} = await api.get<OffersData[]>(APIRoute.Favorites);
        setFavorites(data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };

    getFavorites();
  }, []);

  const groupedFavorites = favorites?.reduce<{[key: string]: OffersData[]}>((acc, offer) => {
    const city = offer.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {});

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <HeaderNav />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {groupedFavorites && Object.keys(groupedFavorites).map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <FavoritesList offerCards={groupedFavorites[city]} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

export default FavoritesPage;
