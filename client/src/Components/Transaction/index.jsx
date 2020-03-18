import React, { Component } from 'react';
import './style.scss';

import { Badge, Button, Accordion, Card } from 'react-bootstrap';

class Transaction extends Component {
  render() {
    const {
      totalAmount,
      dateTransaction,
      reference,
      endPoint,
      category,
      accountIDFrom,
      accountIDTo
    } = this.props;
    return (
      <Accordion className="hvr-grow transaction pb-3">
        <Card>
          <Card.Header>
            <Accordion.Toggle className="card-transaction" as={Button} variant="link" eventKey="0">
              {reference && <h6>{reference}</h6>}
              <div>{totalAmount > 0 && <h6>{totalAmount + ' €'}</h6>}</div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="transaction-toggle">
                <div>
                  Executed on: {dateTransaction && <h6>{dateTransaction.split('T')[0]}</h6>}
                </div>
                <Badge pill variant="info">
                  {category}
                </Badge>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default Transaction;
