import { CITY } from '../../mocks/cities';
// import React from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {ActionCreator} from "../../store/action";
// import {getSelectedCity} from "../../store/selectors";

function ListOfCities(): JSX.Element {
  // const activeCity = useSelector(getSelectedCity);
  // const dispatch = useDispatch();

  // const handleChangeCity = (city, event) => {
  //   event.preventDefault();
  //   dispatch(ActionCreator.changeCity(city));
  // };

  return (
    <ul className="locations__list tabs__list">
      {CITY.map((city) => (
        <li className="locations__item" key={city}>
          <a
            // className={`locations__item-link tabs__item ${activeCity === city ? "tabs__item--active" : ""}`}
            href="#"
            // onClick={(event) => handleChangeCity(city, event)}
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
