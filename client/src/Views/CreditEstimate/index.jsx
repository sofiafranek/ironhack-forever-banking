import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';

import Form from 'react-bootstrap/Form';

class CreditEstimate extends Component {
  render() {
    return (
      <Layout>
        <h1 className="mb-5">Credit Estimate</h1>
        <Form className="credit-estimate">
          <Form.Group controlId="formBasicRangeCustom">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="range" custom />
          </Form.Group>
          <Form.Group controlId="formBasicRangeCustom">
            <Form.Label>Duration</Form.Label>
            <Form.Control type="range" custom />
          </Form.Group>
          <Form.Group controlId="formBasicRangeCustom">
            <Form.Label>Interest Rate</Form.Label>
            <Form.Control type="range" custom />
          </Form.Group>
        </Form>
        <h6 className="mt-5">Total Amount after Duration and Interest : .......</h6>
        <h6 className="mt-3">Total Amount to be Paid per month: .......</h6>
      </Layout>
    );
  }
}

export default CreditEstimate;
