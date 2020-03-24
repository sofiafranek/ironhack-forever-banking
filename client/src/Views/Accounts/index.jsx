import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Components/Layout';
import Account from '../../Components/Account';
import Search from '../../Components/Search';
import Button from '@material-ui/core/Button';
import { userActiveAccounts } from './../../Services/account';
import './style.scss';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      search: '',
      filter: ''
    };
    this.removeAccount = this.removeAccount.bind(this);
    this.searchData = this.searchData.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  searchData(word) {
    this.setState({
      search: word
    });
  }

  filterMethod(filtered) {
    this.setState(previousState => {
      return {
        accounts: previousState.accounts.filter(acc => acc.accountID.type === filtered)
      };
    });
  }

  refresh() {
    window.location.reload();
  }

  async filter(event) {
    event.preventDefault();
    const userID = this.props.user._id;
    const filter = event.target.value;

    this.setState({
      filter
    });

    try {
      const accounts = await userActiveAccounts(userID);
      this.setState({
        accounts
      });

      if (filter === 'Current') {
        this.filterMethod('Current');
      } else if (filter === 'Savings') {
        this.filterMethod('Savings');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getData() {
    const userID = this.props.user._id;

    try {
      const accounts = await userActiveAccounts(userID);
      this.setState({
        accounts
      });
    } catch (error) {
      console.log(error);
    }
  }

  removeAccount(id) {
    this.setState(previousState => {
      return {
        accounts: previousState.accounts.filter(acc => acc._id !== id)
      };
    });
  }

  render() {
    return (
      <Layout>
        <div className="relative accounts-page">
          <h1 className="pb-3 heading-one">Accounts</h1>
          <div className="action-container positioning">
            <Link to={`/accounts/add-account`}>
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
            <Link
              to={{
                pathname: '/accounts/edit-primary',
                state: this.state.accounts
              }}
            >
              <Button variant="contained" className="third">
                <i className="fas fa-pencil-alt"></i>
              </Button>
              <div>Set Primary</div>
            </Link>
          </div>
          <div className="search-filter mobile-filter">
            <Search search={this.searchData} />
            <select name="filter" className="filter" onChange={this.filter}>
              <option value="">All</option>
              <option value="Current">Current</option>
              <option value="Savings">Savings</option>
            </select>
          </div>
          {this.state.accounts.length > 0 ? (
            this.state.accounts.map(single => {
              if (single.accountID.type.toLowerCase().includes(this.state.search.toLowerCase())) {
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
