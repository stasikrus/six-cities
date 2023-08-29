// import React from "react";
// import PropTypes from "prop-types";
// import {Link} from "react-router-dom";
// import {useDispatch} from "react-redux";
// import { ActionCreator } from "../../store/action";
// import useHandleToBookmarksClick from "../../hooks/useHandleToBookmarksClick";
import {OffersData} from '../../types/offers';

type OfferCardProps = {
  card: OffersData;
};

function OfferCard({card}: OfferCardProps): JSX.Element {

  // const dispatch = useDispatch();
  // console.log(card)

  const {href, previewImage, price, title, type, isPremium} = card;
  // const activeBookmarkClass = is_favorite ? `place-card__bookmark-button--active` : ``;

  // const handleMouseEnter = () => {
  //   dispatch(ActionCreator.hoverOffer(id));
  // };

  // const handleMouseLeave = () => {
  //   dispatch(ActionCreator.hoverOffer(null));
  // };

  // const handleToBookmarksClick = useHandleToBookmarksClick(id);

  return (
    <article className={'cities__place-card place-card'}>

      <div className="place-card__mark">
        <span>{isPremium ? 'Premium' : ''}</span>
      </div>
      <div className={'near-places__image-wrapper place-card__image-wrapper'}>
        <a href={href}>
          <img
            className="place-card__image"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
          <button className={'place-card__bookmark-button button'} type="button">
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
          {title}
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}


export default OfferCard;
