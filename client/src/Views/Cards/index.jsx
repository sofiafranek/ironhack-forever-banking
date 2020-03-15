import React from 'react';

import Layout from '../../Components/Layout';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const refresh = () => {
  window.location.reload();
  console.log('refresh');
};

const Cards = () => {
  return (
    <div>
      <Layout>
        <h1>Cards</h1>
        <div className="action-container">
          <Link to={`/accounts/add-account`}>
            <Button variant="contained" className="primary">
              <i className="fas fa-plus"></i>
            </Button>
          </Link>
          <Button variant="contained" className="secondary" onClick={refresh}>
            <i className="fas fa-sync-alt"></i>
          </Button>
        </div>
      </Layout>
    </div>
  );
};

export default Cards;
