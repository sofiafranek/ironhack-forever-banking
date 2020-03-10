import React, { Component } from 'react';

import Navigation from '../Components/Navigation';
import Chart from '../Components/Chart';
import Mobilenavigation from '../Components/Mobilenavigation';
import Layout from '../Components/Layout';
import Transaction from '../Components/Transaction';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      mobile: false
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.renderView();
  };

  renderView() {
    console.log('hello');
    const windowWidth = window.innerWidth;
    if (windowWidth <= 980) {
      console.log('below 980px');
      this.setState({
        mobile: true
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.mobile === true ? <Mobilenavigation /> : <Navigation />}
        {/* <Navigation /> */}
        {/* <Mobilenavigation /> */}
        <Layout>
          <h1 className="pb-5">Dashboard</h1>
          <Chart />
          <hr></hr>
          <h4 className="pb-3 pt-2">Recent Transactions</h4>
          <Transaction />
        </Layout>
      </div>
    );
  }
}

export default Dashboard;