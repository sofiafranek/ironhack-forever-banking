import React, { Component } from 'react';
import './style.scss';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Chip from '@material-ui/core/Chip';

<<<<<<< HEAD
class Transaction extends Component {
  render() {
=======
class Transaction extends Component{
  
  render(){
    const { totalAmount } = this.props;
    console.log(totalAmount);
>>>>>>> d4a502edfa6fe32e9c131b0636e0e51cbc4cafe8
    return (
      <Accordion className="hvr-grow transaction pb-3">
        <Card>
          <Card.Header>
            <Accordion.Toggle className="card-transaction" as={Button} variant="link" eventKey="0">
<<<<<<< HEAD
              <h6 className="pb-2">
                Transaction name here - <Chip label="Category" />
=======
              <h6>
                {totalAmount}<Chip label="Category" />
>>>>>>> d4a502edfa6fe32e9c131b0636e0e51cbc4cafe8
              </h6>
              <div>
                <small className="pl-0">Date of transaction</small>
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
  }
}

export default Transaction;
