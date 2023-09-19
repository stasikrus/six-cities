import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAuthorizationStatus, getUserLogin } from '../../store/selectors';
import { AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { logout } from '../../store/api-actions';
import { HeaderLink } from './header-link';
// import { memo } from 'react';

function HeaderNav(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userLogin = useAppSelector(getUserLogin);
  const isAuth = authorizationStatus === AuthorizationStatus.AUTH;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth && (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {userLogin}
                    </span>
                  </Link>
                </li>)}
              <HeaderLink isAuth={isAuth} handleLogout={handleLogout} />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

// export default memo(HeaderNav);
export default HeaderNav;
