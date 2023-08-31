import { SortType } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getActiveSorting } from '../../store/selectors';
import { useState } from 'react';
import { changeSort } from '../../store/action';
import { SortingType } from '../../types/state';

function SortingList(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeSorting = useAppSelector(getActiveSorting);
  const [isOpened, setIsOpened] = useState(false);

  const changingSort = (filter: SortingType) => {
    dispatch(changeSort({ filter }));
  };

  const handleChangeSort = (filter: SortingType) => () => {
    changingSort(filter);
    setIsOpened(false);
  };

  const toggleOpen = () => {
    setIsOpened(!isOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleOpen}>
        {activeSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((value) => (
          <li
            key={value}
            className={`places__option ${activeSorting === value ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={handleChangeSort(value)}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingList;
