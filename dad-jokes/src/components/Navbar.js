import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = props => {
  const onClick = () => {
    localStorage.removeItem('jwt');
    props.switchState(0);
    props.history.push('/login');
  };
  return (
    <div className="Navbar ">
      <header>
        <div className="logo">
          <h2>Dad Jokes</h2>
        </div>
        <nav>
          {props.isLoggedIn === true && (
            <NavLink onClick={onClick} to="#">
              Logout
            </NavLink>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
