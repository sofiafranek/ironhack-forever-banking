import React, { Component } from 'react';
import { deleteCard } from './../../Services/card';
import './style.scss';

class Card extends Component {
  flip(event) {
    event.preventDefault();
    let element = event.currentTarget;
    if (element.className === 'credit-card__section') {
      if (element.style.transform === 'rotateY(180deg)') {
        element.style.transform = 'rotateY(0deg)';
      } else {
        element.style.transform = 'rotateY(180deg)';
      }
    }
  }

  async deleteACard(event) {
    event.preventDefault();
    const cardNumber = this.props.cardNumber;

    try {
      await deleteCard(cardNumber);
      this.props.history.push({
        pathname: '/cards'
      });
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  }

  render() {
    const { accountID, creditID, cardNumber, CVV, expiryDate, type, userName } = this.props;

    return (
      <section className="card-container">
        {/* <button
          className={
            this.props.toggle === true ? 'delete-card-button--hide' : 'delete-card-button--show'
          }
          onClick={event => this.deleteACard(event)}
        >
          <i className="fas fa-times"></i>
        </button> */}
        <section className="credit-card__section" onClick={event => this.flip(event)}>
          <section className="relative">
            <button
              className={
                this.props.toggle === true ? 'delete-card-button--hide' : 'delete-card-button--show'
              }
              onClick={event => this.deleteACard(event)}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="credit-card credit-card__front">
              <div className="credit-card__top">
                <div className="logo-card"></div>
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
                  <p>{expiryDate}</p>
                </div>
              </div>
            </div>

            <div className="credit-card credit-card__back">
              <div className="credit-card__top">
                <div className="logo-card"></div>
                <h6>{type}</h6>
              </div>

              <div className="credit-card__block">
                <span>{CVV}</span>
              </div>

              <div className="credit-card__info">
                <div className="credit-card__info_name_back">
                  <p>{accountID ? accountID.accountNumber : creditID.accountNumber}</p>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    );
  }
}

export default Card;
