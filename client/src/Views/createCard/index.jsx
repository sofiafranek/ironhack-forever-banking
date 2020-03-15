import React, { Component } from 'react';
import './style.scss';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

import Layout from '../../Components/Layout';

import { creatingCard } from './../../Services/card';
import { userIDAccounts } from './../../Services/account';

class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      accountInfo: '',
      accountID: '',
      type: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  generateCardNumber() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  }

  generatePin() {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  generateCVV() {
    return Math.floor(Math.random() * 900) + 100;
  }

  generateExpiryDate() {
    return Math.floor(Math.random() * 900) + 100;
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;

    const accountSplitted = value.split(' ');
    const accountID = accountSplitted[0];
    const type = accountSplitted[1];

    this.setState({
      accountID,
      type
    });
    console.log(inputName, 'inputname', value, 'value');
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const userID = this.props.userID;
    console.log(userID, 'IDDDDD');
    userIDAccounts(userID)
      .then(account => {
        console.log('view cardsssss', account);
        this.setState({
          accounts: account
        });
      })
      .catch(error => console.log(error));
  }

  setData(event) {
    event.preventDefault();
    const cardNumber = this.generateCardNumber();
    const pin = this.generatePin();
    const CVV = this.generateCVV();
    const expiryDate = this.generateExpiryDate();

    const card = {
      cardNumber,
      pin,
      CVV,
      accountID: this.state.accountID,
      type: this.state.type,
      expiryDate
    };

    creatingCard(card)
      .then(card => {
        console.log(card);
        this.props.history.push('/cards');
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Layout>
        <h1>New Card</h1>
        {this.state.accounts.length > 0 && (
          <form onSubmit={event => this.setData(event)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <InputLabel htmlFor="age-native-simple">Type of Card</InputLabel>
                  <Select
                    name="accountInfo"
                    native
                    onChange={event => this.handleInputChange(event)}
                  >
                    {this.state.accounts.map(acc => (
                      <option value={acc._id + ' ' + acc.type} key={acc.accountNumber}>
                        {acc.accountNumber + ' ' + acc.type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
              Create Card
            </Button>
          </form>
        )}
      </Layout>
    );
  }
}

export default CreateCard;
