import React from 'react';

import Navigation from '../Components/Navigation';
import Layout from '../Components/Layout';
import Account from './../Components/Account';

const Accounts = () => {
  return (
    <div>
      <Navigation />
      <Layout>
        <Account />
      </Layout>
    </div>
  );
};

export default Accounts;
