import { getAuthorizationStatus, getDefaultOffers, getIsFavoriteById } from '../store/selectors';
import { AuthorizationStatus } from '../const';
import history from '../services/browser-history';
import { useAppDispatch, useAppSelector } from '.';
import { updateOffers } from '../store/action';
import { appendFavorite } from '../store/api-actions';

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
      history.push('/login');
    } else {
    // Находим индекс нужного элемента
      const index = defaultOffers.findIndex((offer) => offer.id === id);

      if (index !== -1) {
        // Создаем копию массива и обновляем нужный элемент
        const newOffers = [...defaultOffers];
        newOffers[index] = {
          ...newOffers[index],
          isFavorite: !newOffers[index].isFavorite,
        };

        dispatch(updateOffers(newOffers));
        dispatch(appendFavorite({ id, status: !isFavorite ? 1 : 0 })).catch(() => {
          if (onFailure) {
            onFailure();
          }
        });
      }
    }
  };
};

export default useHandleToBookmarksClick;
