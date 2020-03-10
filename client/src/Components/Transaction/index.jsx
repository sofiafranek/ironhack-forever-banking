import React from 'react';
import './style.scss';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Chip from '@material-ui/core/Chip';

const Transaction = () => {
  return (
    <Accordion className="hvr-grow transaction pb-3">
      <Card>
        <Card.Header>
          <Accordion.Toggle className="card-transaction" as={Button} variant="link" eventKey="0">
            <h6>
              Transaction name here - <Chip label="Category" />
            </h6>
            <div>
              <small>Date of transaction</small>
              <small>Amount of transaction</small>
            </div>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Little more infomration about the transaction like the merchant</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Transaction;
