import React, { Component } from 'react';
import Layout from '../../Components/Layout';

import SingleCredit from '../../Components/Credit';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { creditAccounts } from './../../Services/credit';

class Credit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  refresh() {
    window.location.reload();
  }

  getData() {
    const userID = this.props.user._id;

    creditAccounts(userID)
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
          <h1 className="pb-4 heading-one special-heading">Credit</h1>
          <hr className="mb-4"></hr>
          <div className="action-container">
            <Link to={'/credit/apply-for-credit'}>
              <Button variant="contained" className="primary">
                <i className="fas fa-plus"></i>
              </Button>
              <div>Add</div>
            </Link>
            <div>
              <Button variant="contained" className="secondary" onClick={this.refresh}>
                <i className="fas fa-sync-alt"></i>
              </Button>
              <div>Refresh</div>
            </div>
          </div>
        </section>
        {this.state.account.length > 0 ? (
          this.state.account.map(single => {
            return <SingleCredit key={single._id} {...single} />;
          })
        ) : (
          <p className="pt-3">No Credit Accounts Listed</p>
        )}
      </Layout>
    );
  }
}

export default Credit;
