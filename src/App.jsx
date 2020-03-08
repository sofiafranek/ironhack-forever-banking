import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './Components/Navigation';
import Layout from './Components/Layout';
import Transaction from './Components/Transaction';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Layout>
          <Transaction />
        </Layout>
      </div>
    );
  }
}

export default App;
