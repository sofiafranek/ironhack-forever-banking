import React from 'react';

import Layout from '../../Components/Layout';
import Account from '../../Components/Account';

import Button from '@material-ui/core/Button';

const Accounts = () => {
  return (
    <div>
      <Layout>
        <h1>Accounts</h1>
        <div className="action-container">
          <Button variant="contained" className="primary">
            +
          </Button>
        </div>
        <Account />
      </Layout>
    </div>
  );
};

export default Accounts;
