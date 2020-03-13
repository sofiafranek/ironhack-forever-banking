import React from 'react';

import Layout from '../../Components/Layout';

import Button from '@material-ui/core/Button';

const Payments = () => {
  return (
    <div>
      <Layout>
        <h1>Payments</h1>
        <div className="action-container">
          <Button variant="contained" className="primary">
            <i class="fas fa-plus"></i>
          </Button>
          <Button variant="contained" className="secondary">
            <i class="fas fa-sync-alt"></i>
          </Button>
        </div>
      </Layout>
    </div>
  );
};

export default Payments;
