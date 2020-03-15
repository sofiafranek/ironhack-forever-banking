import React, { Component } from 'react';
import Card from './../../Components/Card';

import Layout from '../../Components/Layout';
import { cards } from './../../Services/card';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
  }

  addingCard() {
    console.log('add card');
  }

  refresh() {
    window.location.reload();
    console.log('refresh');
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    cards()
      .then(cards => {
        console.log(' Cards', cards);
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
        <h1 className="pb-3">Cards</h1>
        <div className="action-container">
          <Link to={`/cards/add-card`} onClick={this.addingCard}>
            <Button variant="contained" className="primary">
              <i className="fas fa-plus"></i>
            </Button>
          </Link>
          <Button variant="contained" className="secondary" onClick={this.refresh}>
            <i className="fas fa-sync-alt"></i>
          </Button>
        </div>
        <div className="">
          {this.state.cards.map(card => (
            <Card key={card._id} {...card} />
          ))}
        </div>
      </Layout>
    );
  }
}

export default Cards;
