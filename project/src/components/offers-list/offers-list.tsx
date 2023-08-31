import OfferCard from '../offer-card/offer-card';
import { OffersData } from '../../types/offers';

type OfferListProps = {
  offers: OffersData[];
};

function OfferList({offers}: OfferListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <OfferCard key={offer.id} card={offer} />
      ))}
    </>
  );
}

export default OfferList;
