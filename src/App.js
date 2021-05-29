import { Switch, NavLink, Redirect, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Suspense, lazy } from 'react';
import image from './images/avatar.png';
import { getCurrentUser, logout } from './redux/operations';
import PrivateRoute from './components/PrivateRoute';

const HomePage = lazy(() => import('./components/HomePage'));
const Registration = lazy(() => import('./components/Registration'));
const Contacts = lazy(() => import('./components/Contacts'));
const LogIn = lazy(() => import('./components/LogIn'));

function App() {
  useEffect(() => {
    onGetCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isAutenticated = useSelector(state => state.isAutenticated);
  const myLogin = useSelector(state => state.user.name);
  const avatar = image;
  const dispatch = useDispatch();
  const onLogout = () => dispatch(logout());
  const onGetCurrentUser = () => dispatch(getCurrentUser());

  return (
    <div className="App">
      <header className="menu">
        <div>
          <NavLink
            to="/"
            exact
            className="menu-main"
            activeClassName="active-link"
          >
            Головна
          </NavLink>
          {isAutenticated ? (
            <NavLink
              to="/contacts"
              className="menu-main"
              activeClassName="active-link"
            >
              Контакти
            </NavLink>
          ) : (
            <span>Контакти</span>
          )}
        </div>

        {isAutenticated ? (
          <div className="menu-profile">
            <span>
              <img src={avatar} alt="Avatar" width="20" /> Welcome, {myLogin}
            </span>
            <button onClick={onLogout} className="btn-logout">
              <NavLink to="/">Logout</NavLink>
            </button>
          </div>
        ) : (
          <div>
            <NavLink
              to="/register"
              className="menu-profile"
              activeClassName="active-link"
            >
              Реєстрація
            </NavLink>
            <NavLink
              to="/login"
              className="menu-profile"
              activeClassName="active-link"
            >
              Логін
            </NavLink>
          </div>
        )}
      </header>

      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/register" component={Registration}>
            {isAutenticated && <Redirect to="/contacts" />}
          </Route>
          <PrivateRoute path="/contacts" component={Contacts} />
          <Route path="/login" component={LogIn}>
            {isAutenticated && <Redirect to="/contacts" />}
          </Route>
          )
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
