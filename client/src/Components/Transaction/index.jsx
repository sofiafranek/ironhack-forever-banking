import React, { Component } from 'react';
import './style.scss';

import { Badge, Button, Accordion, Card } from 'react-bootstrap';

class Transaction extends Component {
  render() {
    console.log(this.props);
    const { totalAmount, dateTransaction, reference, endPoint, category, accountIDFrom, accountIDTo} = this.props;
    return (
      <Accordion className="hvr-grow transaction pb-3">
        <Card>
          <Card.Header>
            <Accordion.Toggle className="card-transaction" as={Button} variant="link" eventKey="0">
              {reference && <h6>{reference}</h6>}
              <Badge pill variant="info">{category}</Badge>
              <div>
                {dateTransaction && <small>{dateTransaction.split('T')[0]}</small>}
                {totalAmount > 0 && <small>{totalAmount + ' €'}</small>}
              </div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{'Transfer from ' + accountIDFrom.accountNumber + ' to ' + accountIDTo.accountNumber}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default Transaction;
