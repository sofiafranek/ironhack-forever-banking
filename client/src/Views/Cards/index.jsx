import React, { Component } from 'react';
import './style.scss';

import Card from '../../Components/Card';

import Layout from '../../Components/Layout';
import { Usercards } from './../../Services/card';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  refresh() {
    window.location.reload();
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const userID = this.props.userID;

    Usercards(userID)
      .then(cards => {
        this.setState({
          cards
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Layout>
        <div className="relative">
          <h1 className="pb-4">Cards</h1>
          <div className="action-container">
            <Link to={`/cards/add-card`}>
              <Button variant="contained" className="primary">
                <i className="fas fa-plus"></i>
              </Button>
            </Link>
            <Button variant="contained" className="secondary" onClick={this.refresh}>
              <i className="fas fa-sync-alt"></i>
            </Button>
            <Button variant="contained" className="third" onClick={this.handleClick}>
              {this.state.isToggleOn ? (
                <i className="fas fa-pencil-alt"></i>
              ) : (
                <i className="fas fa-times"></i>
              )}
            </Button>
          </div>
          <div className="card-container">
            {this.state.cards.map(card => (
              <Card
                key={card._id}
                {...card}
                {...this.props}
                userName={this.props.user.name}
                toggle={this.state.isToggleOn}
              />
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Cards;
