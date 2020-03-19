import React, { Component } from 'react';
import Layout from '../../Components/Layout';

import SingleCredit from '../../Components/Credit';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { userIDAccounts } from './../../Services/credit';

class Credit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: []
    };
  }

  getData() {
    const userID = this.props.user._id;
    userIDAccounts(userID)
      .then(account => {
        this.setState({
          account
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Layout>
        <section className="relative">
          <h1 className="pb-4">Credit</h1>
          <div className="action-container">
            <Link to={`/credit/add-credit`}>
              <Button variant="contained" className="primary">
                <i className="fas fa-plus"></i>
              </Button>
            </Link>
            <Button variant="contained" className="secondary" onClick={this.refresh}>
              <i className="fas fa-sync-alt"></i>
            </Button>
          </div>
        </section>
        {this.state.account.length > 0 ? (
          this.state.account.map(single => {
            if (single.type.toLowerCase().includes(this.state.search.toLowerCase())) {
              return <SingleCredit key={single._id} {...single} />;
            }
          })
        ) : (
          <p className="pt-3">No Credit Accounts Listed</p>
        )}
        <a href="/credit/apply-for-credit">Apply for Credit</a>
      </Layout>
    );
  }
}

export default Credit;
