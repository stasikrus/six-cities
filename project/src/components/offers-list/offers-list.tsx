import OfferCard from '../offer-card/offer-card';
import { offersData } from '../../mocks/offers';

function OfferList(): JSX.Element {
  return (
    <>
      {offersData.map((offer) => (
        <OfferCard key={offer.id} card={offer} /> //Проверить тип массива который передается
      ))}
    </>
  );
}

export default OfferList;
