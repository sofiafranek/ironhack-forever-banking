import React, { Component } from 'react';
import Card from '../../Components/Card';

import Layout from '../../Components/Layout';
import { Usercards } from './../../Services/card';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
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
        <h1 className="pb-3">Cards</h1>
        <div className="action-container">
          <Link to={`/cards/add-card`}>
            <Button variant="contained" className="primary">
              <i className="fas fa-plus"></i>
            </Button>
          </Link>
          <Button variant="contained" className="secondary" onClick={this.refresh}>
            <i className="fas fa-sync-alt"></i>
          </Button>
        </div>
        <div>
          {this.state.cards.map(card => (
            <Card key={card._id} {...card} />
          ))}
        </div>
      </Layout>
    );
  }
}

export default Cards;
