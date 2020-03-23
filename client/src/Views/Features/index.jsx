import React, { Component } from 'react';
import './style.scss';

class Features extends Component {
  componentDidMount() {
    this.props.changeActiveNav();
  }
  render() {
    return (
      <section className="features">
        <nav className="features-nav">
          <div className="homepage-nav--left">
            <a href="/">
              <div className="homepage--logo-image"></div>
            </a>
            <a href="/features">Features</a>
          </div>
          <div>
            <a href="/signin">Login</a>
            <a href="/signup">
              <button>Sign Up Now</button>
            </a>
          </div>
        </nav>
        <section className="features-info">
          <div className="feature-box">
            <h3>Free Account</h3>
            <ul>
              <li>
                <strong>Accounts</strong> - Unlimited Accounts in Wordlwide Currencies
              </li>
              <li>
                <strong>Transactions</strong> - Send and Recieve Money From Fellow Forever Bankers
                or Other Banks*
              </li>
              <li>
                <strong>Cards</strong> - Create Multiple Virtual Cards for your Accounts
              </li>
              <li>
                <strong>Analytics</strong> -{' '}
              </li>
            </ul>
            <small>
              * Only able to transfer and recieve money in the same currency as the account
            </small>
          </div>
          <div className="feature-box">
            <h3>Premium Account</h3>
            <ul>
              <li>
                Everything from <strong>Free</strong> and more...
              </li>
              <li>
                <strong>Shared Accounts</strong> - Share an Account with Another User from Forever
                Banking
              </li>
              <li>
                <strong>Credit</strong> - Apply for Regular Credit and Pay Minimum Payments Per
                Month or Full Amount
              </li>
              <li>
                <strong>Exchange Money</strong> - Able to Transfer Money and Recieve Money that can
                be converted to your Accounts Currency
              </li>
              <li>
                <strong>Exchange Rates</strong> - See how much money you can get from exchanging
                with us
              </li>
              <li>
                <strong>Scheduled Payments</strong> - Organise regular payments with our Schedule
                Payments, never miss a payment deadline.
              </li>
            </ul>
          </div>
        </section>
        {/* <h1>
              Banking <br></br>has never been <br></br>so rewarding.
            </h1>
            <h2>A banking experience consisting of an app with limitless capabilities.</h2> */}
        {/* <div className="homepage--image"></div> */}
      </section>
    );
  }
}

export default Features;
