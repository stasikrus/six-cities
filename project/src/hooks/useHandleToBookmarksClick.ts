import { getAuthorizationStatus, getDefaultOffers, getIsFavoriteById } from '../store/selectors';
import { AuthorizationStatus } from '../const';
import history from '../services/browser-history';
import { useAppDispatch, useAppSelector } from '.';
import { updateOffers } from '../store/site-data/site-data';
import { api } from '../store';
import { AppRoute } from '../const';

type useHandleToBookmarksClickProps = {
  id: number;
  onFailure?: () => void;
}

const useHandleToBookmarksClick = ({id, onFailure}: useHandleToBookmarksClickProps) => {
  
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const defaultOffers = useAppSelector(getDefaultOffers);
  const isFavorite = useAppSelector((state) => getIsFavoriteById(state, id));

  return () => {
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.Login);
    } else {

      if (defaultOffers) {

        const newOffers = defaultOffers.map((offer) => {
          if (offer.id === id) {
            return { ...offer, isFavorite: !offer.isFavorite };
          }
          return offer;
        });

        dispatch(updateOffers(newOffers));
        const postToFavorite = async () => {
          try {
            await api.post(`/favorite/${id}/${!isFavorite ? 1 : 0}`);
          } catch (error) {
            if (onFailure) {
              onFailure();
            }
          }
        };

        postToFavorite();
      }

      history.push(AppRoute.Root);
    }
  };
};

export default useHandleToBookmarksClick;
