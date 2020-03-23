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
          <div className="sign-in-desktop">
            <a href="/signin">Login</a>
            <a href="/signup">
              <button>Sign Up Now</button>
            </a>
          </div>
        </nav>
        <div className="sign-in-mobile">
          <a href="/signin">Login</a>
          <a href="/signup">
            <button>Sign Up Now</button>
          </a>
        </div>
        <section className="features-info">
          <div className="feature-box">
            <h3>Free Account</h3>
            <ul>
              <li>
                <strong>Accounts</strong> - Unlimited accounts in wordlwide currencies
              </li>
              <li>
                <strong>Transactions</strong> - Send and recieve money from fellow forever fankers
                or other banks*
              </li>
              <li>
                <strong>Cards</strong> - Create multiple virtual cards for your accounts
              </li>
              <li>
                <strong>Analytics</strong> - See all your expenses divided by your categories and
                see where you spend your money.
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
                <strong>Shared Accounts</strong> - Share an account with another user from forever
                banking
              </li>
              <li>
                <strong>Credit</strong> - Apply for regular credit and pay minimum payments per
                month or full amount
              </li>
              <li>
                <strong>Exchange Money</strong> - Able to transfer money and recieve money that can
                be converted to your accounts currency
              </li>
              <li>
                <strong>Exchange Rates</strong> - See how much money you can get from exchanging
                with us
              </li>
              <li>
                <strong>Scheduled Payments</strong> - Organise regular payments with our schedule
                payments, never miss a payment deadline.
              </li>
            </ul>
          </div>
        </section>
      </section>
    );
  }
}

export default Features;
