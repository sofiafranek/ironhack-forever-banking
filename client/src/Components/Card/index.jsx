import React, { Component } from 'react';
import './style.scss';

class Card extends Component {
  flip(event) {
    let element = event.currentTarget;
    if (element.className === 'credit-card__section') {
      if (element.style.transform == 'rotateY(180deg)') {
        element.style.transform = 'rotateY(0deg)';
      } else {
        element.style.transform = 'rotateY(180deg)';
      }
    }
  }

  render() {
    const { accountID, cardNumber, CVV, expiryDate, type, bgColor, color } = this.props;
    const style = { backgroundColor: bgColor, color };

    return (
      <section className="credit-card__section" onClick={event => this.flip(event)}>
        <div className="credit-card credit-card__front">
          <div className="credit-card__top">
            <i className="fab fa-modx"></i>
            <h6>{type}</h6>
          </div>

          <div className="credit-card__number">{cardNumber}</div>

          <div className="credit-card__info">
            <div className="credit-card__info_name">
              <div className="credit-card__info_label">CARDHOLDER'S NAME</div>
              <p>MATT SMITH</p>
            </div>

            <div className="credit-card__info_expiry">
              <div className="credit-card__info_label">VALID UP TO</div>
              <p>01/{expiryDate}</p>
            </div>
          </div>
        </div>

        <div className="credit-card credit-card__back">
          <div className="credit-card__top">
            <i className="fab fa-modx"></i>
            <h6>{type}</h6>
          </div>

          <div className="credit-card__block">
            <span>{CVV}</span>
          </div>

          <div className="credit-card__info">
            <div className="credit-card__info_name">
              <div className="credit-card__info_label">CARDHOLDER'S NAME</div>
              <p>SOFIA FRANEK</p>
            </div>

            <div className="credit-card__info_expiry">
              <div className="credit-card__info_label">VALID UP TO</div>
              <p>01/{expiryDate}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Card;
