import React, { Component } from 'react';
import { Badge, Button, Accordion, Card } from 'react-bootstrap';
import getSymbolFromCurrency from 'currency-symbol-map';
import './style.scss';

class Transaction extends Component {
  render() {
    const {
      totalAmount,
      dateTransaction,
      reference,
      category,
      accountIDFrom,
      accountIDTo,
      colorCategory,
      currency,
      creditFrom
    } = this.props;

    let accFrom = null;
    creditFrom ? (accFrom = creditFrom) : (accFrom = accountIDFrom);

    const toggle = this.props.toggle;
    let toggleKey = '';
    toggle === true ? (toggleKey = '0') : (toggleKey = '1');

    return (
      <Accordion className="hvr-grow transaction pb-3" defaultActiveKey={toggleKey}>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              className="card-transaction"
              as={Button}
              variant="link"
              eventKey={toggleKey}
            >
              {reference && <h6>{reference}</h6>}
              <div>
                {totalAmount > 0 && (
                  <h6>{totalAmount + ' ' + getSymbolFromCurrency(accFrom.currency)}</h6>
                )}
              </div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={toggleKey}>
            <Card.Body>
              <div className="transaction-toggle">
                <div>
                  Executed on: {dateTransaction && <h6>{dateTransaction.split('T')[0]}</h6>}
                  {/* <div>
                    Account From: {accountIDFrom} = Account To: {accountIDTo}
                  </div> */}
                </div>
                <Badge variant={colorCategory}>{category}</Badge>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default Transaction;
