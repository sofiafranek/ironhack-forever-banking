import React from 'react';
import './style.scss';

import Layout from '../../Components/Layout';

const SubAccounts = props => {
  return (
    <Layout>
      <h1 className="pb-3">Accounts Menu</h1>
      <hr className="mb-5"></hr>
      <div className="card-body card hvr-grow mb-4">
        <a href="/accounts">Accounts</a>
      </div>
      {props.user.usertype === 'Premium' ? (
        <>
          <div className="card-body card hvr-grow mb-4">
            <a href="/linked-accounts">Shared Accounts</a>
          </div>
          <div className="card-body card hvr-grow mb-4">
            <a href="/credit">Credit</a>
          </div>
        </>
      ) : (
        ''
      )}

      <div className="card-body card hvr-grow">
        <a href="/cards">Cards</a>
      </div>
      {/* <ul className="sub-menu-accounts">
        <a href="/accounts">
          <li>Accounts</li>
        </a>
        <a href="/linked-accounts">
          <li>Shared Accounts</li>
        </a>
        <a href="/credit">
          <li>Credit</li>
        </a>
        <a href="/cards">
          <li>Cards</li>
        </a>
      </ul> */}
    </Layout>
  );
};

export default SubAccounts;
