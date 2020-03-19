import React, { Component } from 'react';

import Layout from '../../Components/Layout';
import CurrencyConverter from '../../Components/CurrencyConverter/CurrencyConverter';

// const Promise = require('bluebird');
// const getExchangeRates = require('get-exchange-rates');

// import { convertCurrency, getCurrencyRate, getCurrencyRateList } from 'currencies-exchange-rates';

class ExchangeRatesView extends Component {
  // componentDidMount() {
  //   getCurrencyRateList('EUR');
  //   console.log(getCurrencyRateList('EUR'), 'helllooooo');

  //   Promise.try(function() {
  //     return getExchangeRates();
  //   }).then(function(rates) {
  //     let amountInEuro = 1;
  //     let amountInUSD = amountInEuro * rates.USD;

  //     console.log(amountInEuro + ' EUR = ' + amountInUSD + ' USD');
  //     // eg. "2 EUR = 2.2838 USD"
  //   });
  // }
  render() {
    return (
      <div>
        <Layout>
          <h1>Exchange Rates</h1>
          <CurrencyConverter />
        </Layout>
      </div>
    );
  }
}

export default ExchangeRatesView;
