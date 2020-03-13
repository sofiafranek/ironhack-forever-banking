import React, { Component } from 'react';
import { loadUserInformation } from './../../Services/authentication';
import Layout from '../../Components/Layout';
// import Transaction from '../Components/Transaction';

class Dashboard extends Component {

  componentDidMount() {
    this.props.changeActiveNav();
    this.getData();
  }

  getData(){
    loadUserInformation()
    .then(user =>{
      console.log("USER", user);
    })
    .catch(error => {
      console.log("ERROR", error);
    })
  }

  render() {
    return (
      <div>
        <Layout>
          <h1 className="pb-3">User Name</h1>
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
