import React from 'react';

import Navigation from '../Components/Navigation';
import Layout from '../Components/Layout';
import Transaction from '../Components/Transaction';

const Transactions = () => {
  return (
    <div>
      <Navigation />
      <Layout>
        <h1 className="pb-3">Transactions</h1>
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
      </Layout>
    </div>
  );
};

export default Transactions;
