import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

const PublicRoute = props => {
  const isAutenticated = useSelector(state => state.isAutenticated);
  const { isNotAutenticated } = props;

  return !isNotAutenticated || (isNotAutenticated && !isAutenticated) ? (
    <Route {...props} />
  ) : null;
};

export default PublicRoute;
