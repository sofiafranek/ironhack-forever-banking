import React from 'react';

import Layout from '../../Components/Layout';
import Transaction from '../../Components/Transaction';

import Button from '@material-ui/core/Button';

const Transactions = () => {
  return (
    <div>
      <Layout>
        <h1 className="pb-3">Transactions</h1>
        <div className="action-container">
          <Button variant="contained" className="secondary">
            <i class="fas fa-sync-alt"></i>
          </Button>
        </div>
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
