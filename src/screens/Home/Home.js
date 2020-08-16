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
  const [loader, setLoader] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [filteredCountryList, setFilteredCountryList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    setLoader(true);
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
        setFilteredCountryList(countryList);
        setFilterList(filterList);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setErrMessage('Some error occured, please try again');
      });
  }, []);

  const _handleOnChange = (e, type) => {
    _setState({ ...state, [type]: e.target.value });
    if (type === 'filter') {
      if (e.target.value.toLowerCase() === 'all') {
        setFilteredCountryList(countryList);
      } else {
        setFilteredCountryList(
          countryList.filter(
            (country) =>
              country.region.toLowerCase() === e.target.value.toLowerCase()
          )
        );
      }
    } else {
      return;
    }
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
                  aria-label="search country"
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
              aria-label="select region"
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
          {loader ? (
            <h1>Loading...</h1>
          ) : errMessage ? (
            <h1 className="err-message">{errMessage}</h1>
          ) : (
            <ul className="country-list">
              {filteredCountryList
                .filter(
                  (country) =>
                    country.name
                      .toLowerCase()
                      .search(state.inputText.toLowerCase()) !== -1
                )
                .map((country) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
