import React, { Component } from 'react';
import './style.scss';

class Card extends Component {
  constructor() {
    super();
  }

  render() {
    const { accountID, cardNumber, CVV, expiryDate, type, bgColor, color } = this.props;
    const style = { backgroundColor: bgColor, color };

    return (
      <div className="card-header card hvr-grow" style={style}>
        <h4>
          {accountID} - {type}
        </h4>
        <h5 className="mb-2">{cardNumber}</h5>
        <h5 className="mb-2">Expires {expiryDate}</h5>
        <h5 className="mb-0">{CVV}</h5>
      </div>
    );
  }
}

export default Card;
