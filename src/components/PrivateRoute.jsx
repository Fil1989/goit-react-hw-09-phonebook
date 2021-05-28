import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = props => {
  const isAutenticated = useSelector(state => state.isAutenticated);

  return isAutenticated ? <Route {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
