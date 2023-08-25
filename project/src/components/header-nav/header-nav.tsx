// import React from "react";
// import { getUserLogin, getAuthorizationStatus } from "../../store/selectors";
// import { AuthorizationStatus } from "../../const";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

function HeaderNav(): JSX.Element {
  // const authorizationStatus = useSelector(getAuthorizationStatus);
  // const userLogin = useSelector(getUserLogin);

  // const isAuth = authorizationStatus === AuthorizationStatus.AUTH;
  // const linkTo = isAuth ? "/favorites" : "/login";
  // const linkContent = isAuth ? userLogin : "Sign in";

  return (
    <li className="header__nav-item user">
      <a className="header__nav-link header__nav-link--profile" href="#">
        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
      </a>
    </li>

  );
}

// export default React.memo(HeaderNav);
export default HeaderNav;
