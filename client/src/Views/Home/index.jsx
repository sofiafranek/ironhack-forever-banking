import React, { Component } from 'react';
import './style.scss';

class Home extends Component {
  componentDidMount() {
    this.props.changeActiveNav();
  }
  render() {
    return (
      <section className="home-page">
        <h1>The New Exclusive Virtual Bank</h1>
        <h3>Say hello to the future of banking.</h3>
        <h5>
          <a href="/signup">Sign Up Now</a> or
          <a href="/signin"> Sign In </a>
          if you're already banking with us
        </h5>
      </section>
    );
  }
}

export default Home;
