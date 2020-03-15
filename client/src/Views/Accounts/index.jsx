import React from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Account from '../../Components/Account';

import Button from '@material-ui/core/Button';

const Accounts = props => {
  console.log(props);
  return (
    <Layout>
      <h1>Accounts</h1>
      <div className="action-container">
        <Button variant="contained" className="primary">
          <i className="fas fa-plus"></i>
        </Button>
        <Button variant="contained" className="secondary">
          <i className="fas fa-sync-alt"></i>
        </Button>
        <Button variant="contained" className="third">
          <i className="fas fa-times"></i>
        </Button>
      </div>
      <Account />
    </Layout>
  );
};

export default Accounts;
