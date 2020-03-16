import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Account from '../../Components/Account';
import Search from '../../Components/Search';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
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
=======
import { userIDAccounts } from './../../Services/account';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: [],
      search: ''
    };
    this.removeAccount = this.removeAccount.bind(this);
    this.searchData = this.searchData.bind(this);
  }

  searchData(word) {
    console.log(word, 'WORD');
    this.setState({
      search: word
    });
  }

  refresh() {
    window.location.reload();
    console.log('refresh');
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

  removeAccount(id) {
    this.setState(previousState => {
      return {
        account: previousState.account.filter(acc => acc._id !== id)
      };
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Layout>
        <h1 className="pb-3">Accounts</h1>
        <div className="action-container">
          <Link to={`/accounts/add-account`}>
            <Button variant="contained" className="primary">
              <i className="fas fa-plus"></i>
            </Button>
          </Link>
          <Button variant="contained" className="secondary" onClick={this.refresh}>
            <i className="fas fa-sync-alt"></i>
          </Button>
        </div>
        <Search search={this.searchData} />
        {this.state.account.length > 0 ? (
          this.state.account.map(single => {
            if (single.type.toLowerCase().includes(this.state.search)) {
              return <Account key={single._id} {...single} />;
            }
          })
        ) : (
          <p className="pt-3">There are no accounts</p>
        )}
      </Layout>
    );
  }
}
>>>>>>> cb21dca7cf794e70dfd0937fa6bb5d7d792c6671

export default Accounts;
