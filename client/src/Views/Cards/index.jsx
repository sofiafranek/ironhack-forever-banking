import React, { Component } from 'react';
import Card from './../../Components/Card';

import Layout from '../../Components/Layout';
import { cards } from './../../Services/card';

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
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
      <div>
        <div className="">
          {this.state.cards.map(card => (
            <Card key={card._id} {...card} />
          ))}
        </div>
      </div>
    );
  }
}

export default Cards;
