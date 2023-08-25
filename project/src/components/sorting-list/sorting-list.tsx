import { SortType } from '../../const';

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ActionCreator } from "../../store/action";
// import { getActiveSorting } from "../../store/selectors";

function SortingList(): JSX.Element {
  // const dispatch = useDispatch();
  // const activeSorting = useSelector(getActiveSorting);
  // const [isOpened, setIsOpened] = useState(false);

  // const changeSort = (filter) => {
  //   dispatch(ActionCreator.changeSort(filter));
  // };

  // const handleChangeSort = (filter) => () => {
  //   changeSort(filter);
  //   setIsOpened(false);
  // };

  // const toggleOpen = () => {
  //   setIsOpened(!isOpened);
  // };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {/* {activeSorting} */}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className="places__options places__options--custom">
        {Object.values(SortType).map((value) => (
          <li key={value} className="places__option" tabIndex={0}>
            {/* onClick={handleChangeSort(value)} */}
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

// export default React.memo(SortingList);
export default SortingList;
