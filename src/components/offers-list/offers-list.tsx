import OfferCard from '../offer-card/offer-card';
import { OffersData } from '../../types/offers';

type OfferListProps = {
  offers: OffersData[];
  isNearOffer: boolean;
};

function OfferList({offers, isNearOffer}: OfferListProps): JSX.Element {

  return (
    <>
      {offers.map((offer) => (
        <OfferCard key={offer.id} card={offer} isNearOffer={isNearOffer} />
      ))}
    </>
  );
}

export default OfferList;
