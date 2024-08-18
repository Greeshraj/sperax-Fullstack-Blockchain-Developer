import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../app/services/auth/authService';
import { logout, setCredentials } from '../features/auth/authSlice';
import './header.css';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15 minutes
  });

  // Automatically authenticate user if token is found
  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  return (
    <header className="header">
      <div className="header-status">
        <span>
          {isFetching
            ? `Fetching your profile...`
            : userInfo
            ? `Welcome ${userInfo.firstName}!`
            : "You're not logged in"}
        </span>
        <div className="cta">
          {userInfo ? (
            <button className="button" onClick={() => dispatch(logout())}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
      <nav className="navigation">
        <NavLink to="/" exact>
          Home
        </NavLink>
        {!userInfo && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
        {userInfo && <NavLink to="/">Profile</NavLink>}
      </nav>
    </header>
  );
};

export default Header;
