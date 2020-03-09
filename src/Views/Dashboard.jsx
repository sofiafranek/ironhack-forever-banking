import React, { Component } from 'react';

import Navigation from '../Components/Navigation';
// import Mobilenavigation from '../Components/Mobilenavigation';
import Layout from '../Components/Layout';
import Transaction from '../Components/Transaction';

class Dashboard extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.renderView();
  };

  renderView() {
    // console.log(window.innerWidth);
    const windowWidth = window.innerWidth;
    if (windowWidth <= 980) {
      console.log('below 980px');
    }
  }

  render() {
    return (
      <div>
        <Navigation />
        {/* <Mobilenavigation /> */}
        <Layout>
          <h1 className="pb-3">Dashboard</h1>
          <hr></hr>
          <h4 className="pb-3 pt-2">Recent Transactions</h4>
          <Transaction />
        </Layout>
      </div>
    );
  }
}

export default Dashboard;
