import React, { Component } from 'react';
import './style.scss';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { creatingCard } from './../../Services/card';

class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountID: '',
      cardNumber: '',
      pin: '',
      CVV: '',
      type: ['Savings', 'Current', 'Credit'],
      expiryDate: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  GenerateCardNumber = () => {
    const randomNumberCard = Math.floor(Math.random() * 9000000000) + 1000000000;
    this.setState({
      cardNumber: randomNumberCard
    });
  };

  GeneratePin = () => {
    const randomNumberPin = Math.floor(Math.random() * 9000000000) + 1000000000;
    this.setState({
      pin: randomNumberPin
    });
  };

  GenerateCVV = () => {
    const randomNumberCVV = Math.floor(Math.random() * 900) + 100;
    this.setState({
      CVV: randomNumberCVV
    });
  };

  handleInputChange(event) {}

  componentDidMount() {}

  getData(event) {}

  render() {
    return (
      <div>
        <h1>New Card</h1>
        <button onClick={this.GenerateCardNumber}>Random Card Number</button>
        <button onClick={this.GeneratePin}>Random Pin Number</button>
        <button onClick={this.GenerateCVV}>Random CVV Number</button>
      </div>
    );
  }
}

export default CreateCard;
