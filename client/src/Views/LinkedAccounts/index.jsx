import React, { Component } from 'react';

import Layout from '../../Components/Layout';
import Account from '../../Components/Account';
import { userLinkedAccounts } from '../../Services/account';
import Button from '@material-ui/core/Button';
//import { Link } from 'react-router-dom';

class LinkedAccounts extends Component {
  constructor(props){
    super(props);
    this.state = {
      linkedAccounts: []
    }
  }

  componentDidMount(){
    this.getData();
  }

  async getData () {
    const userID = this.props.user._id;
    try {
      const linkedAccounts = await userLinkedAccounts(userID);

      console.log(linkedAccounts);
      this.setState({
        linkedAccounts
      })
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <Layout>
        <div className="relative">
          <h1 className="pb-3">Shared Accounts</h1>
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
          {this.state.linkedAccounts.length > 0 ? (
            this.state.linkedAccounts.map(single => (
              <Account key={single._id} {...single} />
            )
          )) : (
            <p className="pt-3">No Accounts Listed</p>
          )}
        </div>
      </Layout>
    );
  }
}

export default LinkedAccounts;
