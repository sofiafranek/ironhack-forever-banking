import React, { Component } from 'react';
import './style.scss';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Chip from '@material-ui/core/Chip';

<<<<<<< HEAD
class Transaction extends Component{
  
  render(){
    const { totalAmount, createdAt, reference, endPoint } = this.props;
    console.log(createdAt);
    //const date = createdAt.split("T")[0];
=======
class Transaction extends Component {
  render() {
    const { totalAmount } = this.props;
>>>>>>> cbe823babfd45cc3d27f300ce8ffda023ccb6e22
    console.log(totalAmount);
    return (
      <Accordion className="hvr-grow transaction pb-3">
        <Card>
          <Card.Header>
            <Accordion.Toggle className="card-transaction" as={Button} variant="link" eventKey="0">
<<<<<<< HEAD
              {
                reference && <h6>{reference}</h6>
              }
              <div>
              {
                createdAt && <small>{createdAt.split("T")[0]}</small>
              }
              {
                totalAmount > 0 && <small>{totalAmount + ' €'}</small>
              }
=======
              <h6>
                {totalAmount}
                <Chip label="Category" />
              </h6>
              <div>
                <small className="pl-0">Date of transaction</small>
                <small>Amount of transaction</small>
>>>>>>> cbe823babfd45cc3d27f300ce8ffda023ccb6e22
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
