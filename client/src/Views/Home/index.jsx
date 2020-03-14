import React, { Component } from 'react';

class Home extends Component {
  componentDidMount() {
    this.props.changeActiveNav();
  }
  render() {
    return (
      <div>home page is here</div>
    )
  }
};

export default Home;
