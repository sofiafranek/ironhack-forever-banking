import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props)
  }

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
