import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleLogout } from '../apiClient';

const Nav = () => {
  // if no token in local storage, then user is not logged in
  const [isLoggedIn, setIsLoggedIn] = useState(
    !localStorage.getItem('token') === null,
  );

  useEffect(() => {
    // Check if the user is logged in by looking for the authentication token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if the token is present
  }, []);

  const handleLogoutClick = async (e) => {
    e.preventDefault();

    try {
      const response = await handleLogout();
      console.log('Log out successful', response);
      setIsLoggedIn(false);
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error during login:', error);
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
