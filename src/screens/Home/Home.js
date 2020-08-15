import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Search } from '../../assets/svg';

import './home.scss';

const Home = () => {
  const [state, _setState] = useState({
    inputText: '',
    filter: '',
  });
  const [countryList, setCountryList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then((response) => response.json())
      .then((countryList) => {
        let filterList = [];
        countryList.forEach((country) => {
          if (filterList.indexOf(country.region) === -1 && country.region) {
            filterList.push(country.region);
          }
        });
        setCountryList(countryList);
        setFilterList(filterList);
      });
  }, []);

  const _handleOnChange = (e, type) => {
    _setState({ ...state, [type]: e.target.value });
  };

  return (
    <div className="homepage-wrapper">
      <div className="container">
        <div className="filter-wrapper">
          <div className="search-wrapper mr-auto">
            <div className="input-group">
              <div className="icon-wrapper">
                <Search className="icon" />
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  value={state.inputText}
                  onChange={(e) => {
                    _handleOnChange(e, 'inputText');
                  }}
                />
              </div>
            </div>
          </div>
          <div className="select-wrapper ml-auto">
            <select
              className="form-select"
              defaultValue={state.filter}
              onChange={(e) => {
                _handleOnChange(e, 'filter');
              }}
            >
              <option value="" disabled hidden>
                Filter by region
              </option>
              <option value="all">All</option>
              {filterList.map((filter, index) => (
                <option value={filter} key={index}>
                  {filter}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="country-list-wrapper">
          <ul className="country-list">
            {countryList.map((country) => (
              <li className="country" key={country.alpha2Code}>
                <Link
                  to={{
                    pathname: `/country/:${country.alpha2Code.toLowerCase()}`,
                    state: {
                      country,
                    },
                  }}
                >
                  <img
                    className="flag-img"
                    src={country.flag}
                    alt={country.name}
                  />
                  <div className="detail">
                    <h3 className="name">{country.name}</h3>
                    <label>Population:</label>
                    <span>&nbsp;{country.population.toLocaleString()}</span>
                    <br />
                    <label>Region:</label>
                    <span>&nbsp;{country.region}</span>
                    <br />
                    <label>Capital:</label>
                    <span>&nbsp;{country.capital}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
