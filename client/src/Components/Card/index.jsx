import React, { Component } from 'react';
import './style.scss';

import { deleteCard } from './../../Services/card';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  flip(event) {
    event.preventDefault();
    let element = event.currentTarget;
    if (element.className === 'credit-card__section') {
      if (element.style.transform == 'rotateY(180deg)') {
        element.style.transform = 'rotateY(0deg)';
      } else {
        element.style.transform = 'rotateY(180deg)';
      }
    }
  }

  deleteACard(event) {
    event.preventDefault();
    const cardNumber = this.props.cardNumber;

    console.log(cardNumber);

    deleteCard(cardNumber)
      .then(() => {
        this.props.history.push({
          pathname: '/cards'
        });
      })
      .catch(error => console.log(error));

    window.location.reload();
  }

  render() {
    const { accountID, cardNumber, CVV, expiryDate, type, userName } = this.props;

    console.log(this.props.toggle, 'toggleee');

    if (this.props.toggle === true) {
      console.log('true');
    } else if (this.props.toggle === false) {
      console.log('false');
    }

    return (
      <section className="card-container">
        <button
          className={
            this.props.toggle === true ? 'delete-card-button--hide' : 'delete-card-button--show'
          }
          onClick={event => this.deleteACard(event)}
        >
          <i className="fas fa-times"></i>
        </button>
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
                <p>{userName}</p>
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
              <div className="credit-card__info_name_back">
                <p>{accountID.accountNumber}</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default Card;
