import React from 'react';

import Layout from '../../Components/Layout';
import Transaction from '../../Components/Transaction';

const Transactions = () => {
  return (
    <div>
      <Layout>
        <h1 className="pb-3">Transactions</h1>
        <small>
          Have a filter so you can see transactions from different accounts but the default
          transactions showing will be the primary account
        </small>
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
