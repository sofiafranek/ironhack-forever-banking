import React, { Component } from 'react';
import './style.scss';

class CurrencyConverter extends Component {
  constructor() {
    super();

    this.state = {
      baseCurrency: 'GBP',
      convertToCurrency: 'USD',
      baseAmount: 100,
      rates: [],
      currencies: []
    };

    this.changeBaseCurrency = this.changeBaseCurrency.bind(this);
    this.changeConvertToCurrency = this.changeConvertToCurrency.bind(this);
    this.changeBaseAmount = this.changeBaseAmount.bind(this);
    this.getConvertedCurrency = this.getConvertedCurrency.bind(this);
    this.callAPI = this.callAPI.bind(this);
  }

  componentDidMount() {
    this.callAPI(this.state.baseCurrency);
  }

  changeBaseCurrency(e) {
    this.setState({ baseCurrency: e.target.value });
    this.callAPI(e.target.value);
  }

  callAPI(base) {
    const api = `https://api.exchangeratesapi.io/latest?base=${base}`;

    fetch(api)
      .then(results => {
        return results.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          rates: data['rates'],
          currencies: Object.keys(data['rates']).sort()
        });
      });
  }

  changeConvertToCurrency(e) {
    this.setState({
      convertToCurrency: e.target.value
    });
  }

  changeBaseAmount(e) {
    this.setState({
      baseAmount: e.target.value
    });
  }

  getConvertedCurrency(baseAmount, convertToCurrency, rates) {
    return Number.parseFloat(baseAmount * rates[convertToCurrency]).toFixed(3);
  }

  render() {
    const { currencies, rates, baseCurrency, baseAmount, convertToCurrency } = this.state;

    const currencyChoice = currencies.map(currency => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ));

    const result = this.getConvertedCurrency(baseAmount, convertToCurrency, rates);

    return (
      <div className="form-container">
        <form className="ui mini form">
          <hr></hr>
          <div className="amount">
            <h5 className="mb-3">How much would you like to convert?</h5>
            <input
              type="number"
              id="base-amount"
              defaultValue={baseAmount}
              onChange={this.changeBaseAmount}
            ></input>
          </div>
          <div className="convert-currency">
            <div>
              <h5>Convert from: {baseCurrency}</h5>
              <select value={baseCurrency} onChange={this.changeBaseCurrency}>
                {currencyChoice}
                <option>{baseCurrency}</option>
              </select>
            </div>

            <div>
              <h5>Convert to: {convertToCurrency}</h5>
              <select value={convertToCurrency} onChange={this.changeConvertToCurrency}>
                {currencyChoice}
              </select>
            </div>
          </div>
        </form>
        <h5 id="result-text" className="mt-3">
          {baseAmount} {baseCurrency} is equal to {result} {convertToCurrency}
        </h5>
      </div>
    );
  }
}

export default CurrencyConverter;
