import { CITY } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getSelectedCity } from '../../store/selectors';
import { OffersDataCityName } from '../../types/offers';
import { changeCity } from '../../store/site-process/site-process';

function ListOfCities(): JSX.Element {
  const activeCity = useAppSelector(getSelectedCity);
  const dispatch = useAppDispatch();

  const handleChangeCity = (city: OffersDataCityName, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(changeCity({city}));
  };

  return (
    <ul className="locations__list tabs__list">
      {CITY.map((city) => (
        <li className="locations__item" key={city}>
          <a
            // eslint-disable-next-line quotes
            className={`locations__item-link tabs__item ${activeCity === city ? "tabs__item--active" : ""}`}
            href="#"
            onClick={(event) => handleChangeCity(city, event)}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

// export default React.memo(ListOfCities);
export default ListOfCities;
