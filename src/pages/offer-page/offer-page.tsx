import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import OfferList from '../../components/offers-list/offers-list';
import { useAppSelector } from '../../hooks';
import CommentsList from '../../components/comments-list/comments-list';
import CommentForm from '../../components/comment-form/comment-form';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/selectors';
import HeaderNav from '../../components/header-nav/header-nav';
import MapComponent from '../../components/map/map';
import useHandleToBookmarksClick from '../../hooks/useHandleToBookmarksClick';
import useOfferData from '../../hooks/useOfferData';


const OfferPage = () => {

  const { id } = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { offer, setOffer, offersNear, loading, comments, setComments } = useOfferData(+id!);

  const handleToBookmarksClick = useHandleToBookmarksClick({
    id: +id!,
    onFailure: () => { toggleFavorite(); }
  });

  const toggleFavorite = () => {
    if (offer !== null) {
      setOffer({ ...offer, isFavorite: !offer.isFavorite });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const { title, isPremium, price, images, bedrooms, maxAdults, rating, description, goods, host, isFavorite } = offer!;
  const { avatarUrl, isPro, name } = host;
  const bookMarkActiveClass = isFavorite ? 'property__bookmark-button--active' : '';
  const percentage = (rating / 5) * 100;

  return (
    <div className="page">
      <HeaderNav />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => (
                <div className="property__image-wrapper" key={`${id!}-image-${image}`}>
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
                  onClick={() => {
                    toggleFavorite();
                    handleToBookmarksClick();
                  }}
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
                  <span style={{ width: `${percentage}%` }}></span>
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
                      key={`${id!}-goods-${item}`}
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
                {comments && <CommentsList offerComments={comments} />}
                {authorizationStatus === AuthorizationStatus.AUTH && (
                  <CommentForm hotelId={Number(id)} setComments={setComments} />
                )}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <MapComponent points={offersNear!} heightMap={579} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OfferList offers={offersNear!} isNearOffer />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
