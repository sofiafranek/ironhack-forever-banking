import React, { Component } from 'react';

import Layout from '../../Components/Layout';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class linkedAccounts extends Component {
  render() {
    return (
      <Layout>
        <div className="relative">
          <h1 className="pb-3">Linked Accounts</h1>
          <div className="action-container">
            {/* <Link to={`/accounts/add-account`}>
              <Button variant="contained" className="primary">
                <i className="fas fa-plus"></i>
              </Button>
            </Link> */}
            <Button variant="contained" className="secondary">
              <i className="fas fa-sync-alt"></i>
            </Button>
          </div>
          {/* {this.state.account.length > 0 ? (
            this.state.account.map(single => {
              if (single.type.toLowerCase().includes(this.state.search.toLowerCase())) {
                return <Account key={single._id} {...single} />;
              }
            })
          ) : (
            <p className="pt-3">No Accounts Listed</p>
          )} */}
        </div>
      </Layout>
    );
  }
}

export default linkedAccounts;
