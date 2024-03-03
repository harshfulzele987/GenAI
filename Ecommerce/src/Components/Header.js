import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth } from './AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          My App
        </Link>
        {/* ... other nav elements ... */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {/* Conditionally render links based on isLoggedIn */}
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/signup">
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/login">
                  Login
                </NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <LogoutButton onLogout={logout} />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
