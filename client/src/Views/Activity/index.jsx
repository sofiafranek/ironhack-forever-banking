import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import ActivityAccount from '../../Components/ActivityAccount';

import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

import { activity } from './../../Services/activity';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
      information: []
    };
  }

  getData() {
    const userID = this.props.user._id;
    activity(userID)
      .then(information => {
        this.setState({
          information
        });
        console.log(this.state.information, 'information');
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.getData();
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
      <Layout>
        <div className="relative">
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
          <hr className="pb-1 pt-1"></hr>
          <h4 className="pb-2">Accounts Listed Here</h4>
          {this.state.information.length > 0 ? (
            this.state.information.map(single => {
              return <ActivityAccount key={single._id} {...single} />;
            })
          ) : (
            <p className="pt-3">There are no accounts</p>
          )}
        </div>
      </Layout>
    );
  }
}

export default Dashboard;
