import React, { Component } from 'react';
import Card from './../../Components/Card';

import Layout from '../../Components/Layout';
import { cards } from './../../Services/card';

<<<<<<< HEAD
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
=======
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const refresh = () => {
  window.location.reload();
  console.log('refresh');
};

const Cards = () => {
  return (
    <div>
      <Layout>
        <h1>Cards</h1>
        <div className="action-container">
          <Link to={`/accounts/add-account`}>
            <Button variant="contained" className="primary">
              <i className="fas fa-plus"></i>
            </Button>
          </Link>
          <Button variant="contained" className="secondary" onClick={refresh}>
            <i className="fas fa-sync-alt"></i>
          </Button>
        </div>
      </Layout>
    </div>
  );
};
>>>>>>> 3c14671a40adab3b9fe8dc314769d5201f53790f

export default Cards;
