import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';

import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

class Dashboard extends Component {
  componentDidMount() {
    this.props.changeActiveNav();
  }

  render() {
    const user = this.props.user;
    return (
      <div className="relative">
        <Layout>
          <div className="d-flex dashboard-action-buttons">
            <Link to="/profile">
              <MenuItem className="primary">
                <i className="fas fa-user"></i>
              </MenuItem>
            </Link>

            <Link to="/">
              <MenuItem className="secondary">
                <i className="fas fa-sign-out-alt"></i>
              </MenuItem>
            </Link>
          </div>
          <h1 className="pb-3">{user.name}</h1>
          <hr></hr>
          <h5>Accounts listed here</h5>
          <hr></hr>
          <h5>Rates converted listed here</h5>
          <hr></hr>
          <h5>Transactions (recent) listed here</h5>
          <hr></hr>
        </Layout>
      </div>
    );
  }
}

export default Dashboard;
