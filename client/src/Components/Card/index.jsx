import React, { Component } from 'react';
import './style.scss';

class Card extends Component {
  render() {
    const { accountID, cardNumber, CVV, expiryDate, type, bgColor, color } = this.props;
    const style = { backgroundColor: bgColor, color };

    return (
      <div className="credit-card">
        <div className="credit-card__logo">
          <i className="fab fa-modx"></i>
        </div>

        <div className="credit-card__number">{cardNumber}</div>

        <div className="credit-card__info">
          <div className="credit-card__info_name">
            <div className="credit-card__info_label">CARDHOLDER'S NAME</div>
            <div>MATT SMITH</div>
          </div>

          <div className="credit-card__info_expiry">
            <div className="credit-card__info_label">VALID UP TO</div>
            <div>01/{expiryDate}</div>
          </div>
        </div>
      </div>
      /*  <div className="card-header card hvr-grow mb-3" style={style}>
        <h4>{type}</h4>
        <h5 className="mb-2">Card Number: </h5>
        <h5 className="mb-2">Expiry Date: </h5>
        <h5 className="mb-0">CVV: {CVV}</h5>
        <hr></hr>
        <h6>Card Account: {accountID.accountNumber}</h6>
      </div> */
    );
  }
}

export default Card;
