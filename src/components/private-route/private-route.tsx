import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.AUTH
      ? children
      : <Navigate to={AppRoute.Login} />
  );
};

export default PrivateRoute;
