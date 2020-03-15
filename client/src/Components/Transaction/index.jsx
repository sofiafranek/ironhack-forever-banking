import React, { Component } from 'react';
import './style.scss';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Chip from '@material-ui/core/Chip';

class Transaction extends Component{
  
  render(){
    const { totalAmount, createdAt, reference, endPoint } = this.props;
    console.log(createdAt);
    //const date = createdAt.split("T")[0];
    console.log(totalAmount);
    return (
      <Accordion className="hvr-grow transaction pb-3">
        <Card>
          <Card.Header>
            <Accordion.Toggle className="card-transaction" as={Button} variant="link" eventKey="0">
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
};

export default Transaction;
