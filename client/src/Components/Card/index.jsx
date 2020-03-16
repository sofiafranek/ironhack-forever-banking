import React, { Component } from 'react';
import './style.scss';

class Card extends Component {
  constructor() {
    super();
<<<<<<< HEAD
    this.state = {
      cardNumber: ''
    };
=======
>>>>>>> cb21dca7cf794e70dfd0937fa6bb5d7d792c6671
  }

  render() {
    const { accountID, cardNumber, CVV, expiryDate, type, bgColor, color } = this.props;
    const style = { backgroundColor: bgColor, color };

    return (
<<<<<<< HEAD
      <div className="card" style={style}>
        <p>{accountID}</p>
        <p>{type}</p>
        <p>{cardNumber}</p>
        <p>Expires {expiryDate}</p>
        <p>{CVV}</p>
        {/*         <p>{name}</p>
         */}{' '}
=======
      <div className="card-header card hvr-grow mb-3" style={style}>
        <h4>{type}</h4>
        <h5 className="mb-2">Card Number: {cardNumber}</h5>
        <h5 className="mb-2">Expiry Date: {expiryDate}</h5>
        <h5 className="mb-0">CVV: {CVV}</h5>
        <hr></hr>
        <h6>Card Account: {accountID.accountNumber}</h6>
>>>>>>> cb21dca7cf794e70dfd0937fa6bb5d7d792c6671
      </div>
    );
  }
}

export default Card;
