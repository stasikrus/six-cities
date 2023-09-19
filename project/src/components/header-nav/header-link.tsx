import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEvent } from 'react';

type HeaderLinkProps = {
  isAuth: boolean;
  handleLogout: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const HeaderLink = ({ isAuth, handleLogout }: HeaderLinkProps): JSX.Element => {
  const linkProps = isAuth
    ? { to: '#', onClick: handleLogout, text: 'Sign out' }
    : { to: AppRoute.Login, text: 'Sign in' };

  return (
    <li className="header__nav-item">
      <Link
        className="header__nav-link"
        to={linkProps.to}
        onClick={linkProps.onClick ? handleLogout : undefined}
      >
        <span className="header__signout">{linkProps.text}</span>
      </Link>
    </li>
  );
};
