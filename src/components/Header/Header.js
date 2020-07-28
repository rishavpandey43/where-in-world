import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

import { Theme } from '../../assets/svg';

const Header = () => {
  return (
    <header>
      <nav className="container nav nav-bar">
        <div className="nav-brand mr-auto">
          <Link to="/" className="link">
            Where in the world
          </Link>
        </div>
        <div className="nav-end ml-auto">
          <button className="toggle-theme-btn">
            <Theme className="icon" />
            Dark Theme
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
