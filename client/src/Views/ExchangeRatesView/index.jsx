import React, { Component } from 'react';

import Layout from '../../Components/Layout';
import CurrencyConverter from '../../Components/CurrencyConverter';

class ExchangeRatesView extends Component {
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
