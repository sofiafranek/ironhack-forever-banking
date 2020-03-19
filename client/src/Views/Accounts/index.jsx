import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Account from '../../Components/Account';
import Search from '../../Components/Search';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { userIDAccounts } from './../../Services/account';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: [],
      search: '',
      filter: ''
    };
    this.removeAccount = this.removeAccount.bind(this);
    this.searchData = this.searchData.bind(this);
    this.filter = this.filter.bind(this);
  }

  searchData(word) {
    this.setState({
      search: word
    });
  }

  filterMethod(filtered) {
    this.setState(previousState => {
      return {
        account: previousState.account.filter(acc => acc.type === filtered)
      };
    });
  }

  filter(event) {
    event.preventDefault();
    const filter = event.target.value;

    this.setState({
      filter
    });

    const userID = this.props.user._id;
    userIDAccounts(userID)
      .then(account => {
        this.setState({
          account
        });
        if (filter === 'Current') {
          this.filterMethod('Current');
        } else if (filter === 'Savings') {
          this.filterMethod('Savings');
        }
      })
      .catch(error => console.log(error));
  }

  refresh() {
    window.location.reload();
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
        <div className="relative accounts-page">
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
          <div className="search-filter mobile-filter">
            <Search search={this.searchData} />
            <select name="filter" className="filter" onChange={this.filter}>
              <option value="">All</option>
              <option value="Current">Current</option>
              <option value="Savings">Savings</option>
            </select>
          </div>
          {this.state.account.length > 0 ? (
            this.state.account.map(single => {
              if (single.type.toLowerCase().includes(this.state.search.toLowerCase())) {
                return <Account key={single._id} {...single} />;
              }
            })
          ) : (
            <p className="pt-3">No Accounts Listed</p>
          )}
        </div>
      </Layout>
    );
  }
}

export default Accounts;
