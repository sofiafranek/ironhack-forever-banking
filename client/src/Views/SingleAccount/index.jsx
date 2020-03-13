import React from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Transaction from '../../Components/Transaction';
// import Chart from '../../Components/Chart';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const SingleAccount = () => {
  return (
    <Layout>
      <section className="single-account">
        <div className="d-flex justify-content-between pb-3">
          <h1>Single Account Page</h1>
          <span className="allign-right">
            <h1>£200.00</h1>
            <small>Available balance || Total credit limit</small>
          </span>
        </div>
        <Tabs defaultActiveKey="summary">
          <Tab eventKey="summary" title="Summary">
            <h5>Account Number : 1234567890</h5>
            <h5>Account Type : Current, Savings or Credit</h5>
            <h5>Card Number : 1234 1234 1234 1234</h5>
            <h5>Card Expirty : 12 / 04</h5>
          </Tab>
          <Tab eventKey="transactions" title="Transactions">
            {/* <Chart /> */}
            <Transaction />
            <Transaction />
            <Transaction />
            <Transaction />
            <Transaction />
          </Tab>
          <Tab eventKey="settings" title="Settings">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fuga.</p>
          </Tab>
        </Tabs>
      </section>
    </Layout>
  );
};

export default SingleAccount;
