import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getUserLogin } from '../../store/selectors';
import { AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function HeaderNav(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userLogin = useAppSelector(getUserLogin);

  const isAuth = authorizationStatus === AuthorizationStatus.AUTH;
  const linkTo = isAuth ? AppRoute.Favorites : AppRoute.Login;
  const linkContent = isAuth ? userLogin : 'Sign in';

  return (
    <li className="header__nav-item user">
      <Link to={linkTo} className="header__nav-link header__nav-link--profile">
        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        <span className={isAuth ? 'header__user-name user__name' : 'header__login'}>
          {linkContent}
        </span>
      </Link>
    </li>
  );
}

// export default React.memo(HeaderNav);
export default HeaderNav;
