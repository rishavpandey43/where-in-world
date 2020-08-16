import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

import { Theme } from '../../assets/svg';

const Header = () => {
  const [theme, setTheme] = useState('dark');

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.style.setProperty(
        '--theme-bg-color-1',
        '#ffffff'
      );
      document.documentElement.style.setProperty(
        '--theme-bg-color-2',
        '#efefef'
      );
      document.documentElement.style.setProperty(
        '--theme-text-color',
        '#202c37'
      );
      document.documentElement.style.setProperty('--shadow', '#d4d4d4');
    } else {
      document.documentElement.style.setProperty(
        '--theme-bg-color-1',
        '#2b3945'
      );
      document.documentElement.style.setProperty(
        '--theme-bg-color-2',
        '#202c37'
      );
      document.documentElement.style.setProperty(
        '--theme-text-color',
        '#ffffff'
      );
      document.documentElement.style.setProperty('--shadow', '#171f27');
    }
  }, [theme]);

  return (
    <header>
      <nav className="container nav nav-bar">
        <div className="nav-brand mr-auto">
          <Link to="/" className="link">
            <img
              src={require('../../assets/worldwide.png')}
              alt="Where in the world"
              width="20px"
            />
            <span>Where in the world</span>
          </Link>
        </div>
        <div className="nav-end ml-auto">
          <button className="toggle-theme-btn" onClick={changeTheme}>
            <Theme className="icon" />
            {theme === 'dark' ? 'Dark' : 'Light'} Theme
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
