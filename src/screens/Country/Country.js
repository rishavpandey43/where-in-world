import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './country.scss';

class Country extends Component {
  render() {
    return (
      <div className="country-wrapper">
        <div className="container">
          <Link to="/" className="back">
            Back
          </Link>
          <div className="country">
            <div>
              <img
                src={this.props.location.state.country.flag}
                alt=""
                className="flag"
              />
            </div>
            <div className="detail">
              <h1>{this.props.location.state.country.name}</h1>
              <div className="more-detail">
                <div>
                  <label>Native Name:</label>
                  <span>
                    &nbsp;
                    {this.props.location.state.country.nativeName}
                  </span>
                  <br />
                  <label>Population:</label>
                  <span>
                    &nbsp;
                    {this.props.location.state.country.population.toLocaleString()}
                  </span>
                  <br />
                  <label>Region:</label>
                  <span>&nbsp;{this.props.location.state.country.region}</span>
                  <br />
                  <label>Sub Region:</label>
                  <span>
                    &nbsp;{this.props.location.state.country.subregion}
                  </span>
                  <br />
                  <label>Capital:</label>
                  <span>&nbsp;{this.props.location.state.country.capital}</span>
                </div>
                <div>
                  <label>Top Level Domain:</label>
                  <span>&nbsp;{this.props.location.state.country.region}</span>
                  <br />
                  <label>Currencies:</label>
                  <span>
                    &nbsp;
                    {this.props.location.state.country.currencies.map(
                      (currency, i) =>
                        i !==
                        this.props.location.state.country.currencies.length - 1
                          ? currency.name + ', '
                          : currency.name
                    )}
                  </span>
                  <br />
                  <label>Languages:</label>
                  <span>&nbsp;{this.props.location.state.country.capital}</span>
                </div>
              </div>
              <div className="boundaries">
                <h3>Border Countries:</h3>
                {this.props.location.state.country.borders.map((border, i) => (
                  <span key={i}>{border}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Country;
