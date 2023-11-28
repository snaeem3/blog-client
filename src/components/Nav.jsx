import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../authContext';

const Nav = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogoutClick = async (e) => {
    e.preventDefault();

    try {
      await logout();
      console.log('Log out successful');
    } catch (error) {
      console.error('Error during log out:', error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          {isLoggedIn ? (
            <button type="button" onClick={handleLogoutClick}>
              Log-out
            </button>
          ) : (
            <Link to="/log-in">
              <button type="button">Log-in</button>
            </Link>
          )}
        </li>
        {!isLoggedIn ? (
          <li>
            <Link to="/sign-up">
              <button type="button">Sign Up</button>
            </Link>
          </li>
        ) : (
          ''
        )}
      </ul>
    </nav>
  );
};

export default Nav;
