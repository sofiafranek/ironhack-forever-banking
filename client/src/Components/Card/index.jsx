import React, { Component } from 'react';
import './style.scss';

class Card extends Component {
  constructor() {
    super();
    this.state = {
      cardNumber: ''
    };
  }

  render() {
    const { accountID, cardNumber, CVV, expiryDate, type, bgColor, color } = this.props;
    const style = { backgroundColor: bgColor, color };

    return (
      <div className="card" style={style}>
        <p>{accountID}</p>
        <p>{type}</p>
        <p>{cardNumber}</p>
        <p>Expires {expiryDate}</p>
        <p>{CVV}</p>
        {/*         <p>{name}</p>
         */}{' '}
      </div>
    );
  }
}

export default Card;
