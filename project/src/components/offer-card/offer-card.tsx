// import useHandleToBookmarksClick from "../../hooks/useHandleToBookmarksClick";
import {OffersData} from '../../types/offers';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { hoverOffer } from '../../store/action';
import useHandleToBookmarksClick from '../../hooks/useHandleToBookmarksClick';

type OfferCardProps = {
  card: OffersData;
  isNearOffer: boolean;
};

function OfferCard({card, isNearOffer}: OfferCardProps): JSX.Element {

  const {id, href, previewImage, price, title, type, isPremium, isFavorite} = card;

  const dispatch = useAppDispatch();

  const activeBookmarkClass = isFavorite ? 'place-card__bookmark-button--active' : '';

  const handleMouseEnter = () => {
    dispatch(hoverOffer({id}));
  };

  const handleMouseLeave = () => {
    dispatch(hoverOffer({id: null}));
  };

  const handleToBookmarksClick = useHandleToBookmarksClick({id});

  return (
    <article className={`${isNearOffer ? 'near-places__card' : 'cities__place-card'} place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="place-card__mark">
        <span>{isPremium ? 'Premium' : ''}</span>
      </div>
      <div className={`${isNearOffer ? 'near-places__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`}>
        <a href={href}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${activeBookmarkClass} button`} type="button" onClick={handleToBookmarksClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={{
            pathname: `/offer/${id}`,
          }}
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}


export default OfferCard;
