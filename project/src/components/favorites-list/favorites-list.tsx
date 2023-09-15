import FavoriteCard from '../favorite-card/favorite-card';
import { OffersData } from '../../types/offers';

type FavoritesListProps = {
  offerCards: OffersData[];
}

const FavoritesList = ({offerCards}: FavoritesListProps) => (
  <>
    {offerCards.map((card) => (
      <FavoriteCard card={card} key={card.id} />
    ))}
  </>
);

export default FavoritesList;
