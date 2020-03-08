import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './Components/Navigation';
import Layout from './Components/Layout';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Layout></Layout>
      </div>
    );
  }
}

export default App;
