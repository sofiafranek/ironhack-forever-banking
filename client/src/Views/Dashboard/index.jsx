import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';

import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }

  componentDidMount() {
    this.props.changeActiveNav();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.renderView();
  };

  renderView() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 980) {
      this.setState({
        mobile: false
      });
    } else {
      this.setState({
        mobile: true
      });
    }
  }

  render() {
    const user = this.props.user;
    return (
      <div className="relative">
        <Layout>
          {this.state.mobile === true ? (
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
          ) : (
            ''
          )}
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
