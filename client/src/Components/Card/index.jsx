import React, { Component } from 'react';
import './style.scss';

class Card extends Component {
  render() {
    const { accountID, cardNumber, CVV, expiryDate, type, bgColor, color } = this.props;
    const style = { backgroundColor: bgColor, color };

    return (
      <div className="component-card" style={style}>
        <p>{accountID}</p>
        <p>{type}</p>
        <p>{cardNumber}</p>
        <p>Expires {expiryDate}</p>
        <p>{CVV}</p>
      </div>
    );
  }
}

export default Card;
