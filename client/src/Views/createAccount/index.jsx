import React, { Component } from 'react';
import './style.scss';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { creatingAccount } from './../../Services/account';
import { creatingCard } from './../../Services/card';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Savings',
      types: ['Savings', 'Current', 'Credit'],
      balance: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setData = this.setData.bind(this);
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;
    this.setState({
      [inputName]: value
    });
  }

  componentDidMount() {
    this.props.changeActiveNav();
  }

  randomKey() {
    let Numberresult = '';
    let Numbercharacters = '0123456789';
    let NumbercharactersLength = Numbercharacters.length;
    for (let i = 0; i < 2; i++) {
      Numberresult += Numbercharacters.charAt(Math.floor(Math.random() * NumbercharactersLength));
    }

    let Letterresult = '';
    let Lettercharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let LettercharactersLength = Lettercharacters.length;
    for (let i = 0; i < 20; i++) {
      Letterresult += Lettercharacters.charAt(Math.floor(Math.random() * LettercharactersLength));
    }

    let result = Numberresult + Letterresult;
    console.log(result);
    return result;
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

  setData(event) {
    event.preventDefault();
    const userID = this.props.location.state.idUser;
    const accountNumber = this.randomKey();

    const account = Object.assign({}, this.state);
    account.accountNumber = accountNumber;
    account.userID = userID;

    creatingAccount(account)
      .then(account => {
        const cardNumber = this.generateCardNumber();
        const pin = this.generatePin();
        const CVV = this.generateCVV();
        const expiryDate = this.generateExpiryDate();

        const card = {
          cardNumber,
          pin,
          CVV,
          accountID: account._id,
          type: account.type,
          expiryDate,
          userID
        };

        creatingCard(card)
          .then(card => {
            console.log(card);
          })
          .catch(error => console.log(error));

        this.props.history.push('/summary');
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Container className="layout-width centered-page">
        <h1 className="mb-4">Create an Account</h1>
        <form onSubmit={event => this.setData(event)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Type of Account</InputLabel>
                <Select name="type" native onChange={event => this.handleInputChange(event)}>
                  {this.state.types.map(type => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <h4 className="pl-2 pt-3 pb-2">Add money to your new account</h4>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="externalAccountNo"
                label="Account No."
                name="externalAccountNo"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="externalSortCode"
                label="Sort Code"
                name="externalSortCode"
              />
            </Grid> */}
            <Grid item xs={12} sm={12}>
              <TextField variant="outlined" required fullWidth id="iban" label="IBAN" name="iabn" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="reference"
                label="Reference"
                name="reference"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="balance"
                label="Balance"
                name="balance"
                value={this.state.balance}
                onChange={event => this.handleInputChange(event)}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Create Account
          </Button>
        </form>
      </Container>
    );
  }
}

export default CreateAccount;
