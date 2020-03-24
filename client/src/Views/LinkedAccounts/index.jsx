import React, { Component } from 'react';

import Layout from '../../Components/Layout';
import SharedAccount from '../../Components/SharedAccount';
import { userLinkedAccounts } from '../../Services/account';
import Button from '@material-ui/core/Button';

class LinkedAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedAccounts: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const userID = this.props.user._id;
    try {
      const linkedAccounts = await userLinkedAccounts(userID);
      this.setState({
        linkedAccounts
      });
    } catch (error) {
      console.log(error);
    }
  }

  randomKey(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  render() {
    return (
      <Layout>
        <div className="relative">
          <h1 className="pb-3 heading-one special-heading">Shared Accounts</h1>
          <hr className="mb-4"></hr>
          <div className="action-container">
            <div className="shared-accounts-actions">
              <Button variant="contained" className="secondary">
                <i className="fas fa-sync-alt"></i>
              </Button>
              <div>Refresh</div>
            </div>
          </div>
          {this.state.linkedAccounts.length > 0 ? (
            this.state.linkedAccounts.map(single => (
              <SharedAccount key={this.randomKey(50)} {...single} />
            ))
          ) : (
            <p className="pt-3">No Accounts Listed</p>
          )}
        </div>
      </Layout>
    );
  }
}

export default LinkedAccounts;
