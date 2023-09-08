import { useParams } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import { useState, useEffect } from 'react';
import { api } from '../../store';
import { OfferData } from '../../types/offer';
import { OffersData } from '../../types/offers';
import { Link } from 'react-router-dom';
import OfferList from '../offers-list/offers-list';

const OfferPage = () => {
  const [offer, setOffer] = useState<OfferData | null>(null);
  const [loading, setLoading] = useState(true);
  const [offersNear, setOffersNear] = useState<OffersData[] | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchDataOffer = async () => {
      try {
        const [offerResponse, offersNearResponse] = await Promise.all([
          api.get<OfferData>(`/hotels/${id!}`),
          api.get<OffersData[]>(`/hotels/${id!}/nearby`)
        ]);

        setOffer(offerResponse.data);
        setOffersNear(offersNearResponse.data);
        setLoading(false);

      } catch (error) {
        // eslint-disable-next-line
        console.error(error)
      }
    };

    fetchDataOffer();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  const { title, isPremium, price, images, bedrooms, maxAdults, rating, description, goods, host, isFavorite } = offer!;
  const { avatarUrl, isPro, name } = host;
  const bookMarkActiveClass = isFavorite ? 'property__bookmark-button--active' : '';

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {/* <HeaderNav /> */}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => (
                <div className="property__image-wrapper" key={`photo-${id!}`}>
                  <img
                    className="property__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                <span>{isPremium ? 'Premium' : ''}</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button
                  className={`property__bookmark-button button ${bookMarkActiveClass}`}
                  type="button"
                  // onClick={handleToBookmarksClick}
                >
                  <svg
                    className="property__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: '80%' }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  <span>Entire place</span>
                </li>
                <li className="property__feature property__feature--bedrooms">
                  <span>{bedrooms} Bedrooms</span>
                </li>
                <li className="property__feature property__feature--adults">
                  <span>Max {maxAdults} adults</span>
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item) => (
                    <li
                      className="property__inside-item"
                      key={`${id!}-goods`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{name}</span>
                  {isPro ? (
                    <span className="property__user-status">Pro</span>
                  ) : (
                    ''
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                {/* <ReviewsList />
                {authorizationStatus === AuthorizationStatus.AUTH && (
                  <CommentForm hotel_id={id} />
                )} */}
              </section>
            </div>
          </div>
          <section className="property__map map">
            {/* <Map points={offersNear} heightMap={579} /> */}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OfferList offers={offersNear!} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
