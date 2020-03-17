import React, { Component } from 'react';
import './style.scss';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

    if (value === 'Credit') {
      this.setState({
        balance: '5000'
      });
    }

    console.log(this.state.balance, 'hello blaance');
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
    return result;
  }

  generateCardNumber() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
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
        const CVV = this.generateCVV();
        const expiryDate = this.generateExpiryDate();

        const card = {
          cardNumber,
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
          <Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel htmlFor="age-native-simple">Type of Account</InputLabel>
              <Select name="type" native onChange={event => this.handleInputChange(event)}>
                {this.state.types.map(type => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </Select>
              {this.state.type === 'Credit' ? (
                <Grid item xs={12} sm={12}>
                  <div className="pt-3">We offer a 5.000€ starting credit limit</div>
                </Grid>
              ) : (
                <>
                  <h4 className="pt-4 pb-3">Add money to your new account</h4>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="iban"
                      label="IBAN"
                      name="iabn"
                      className="pb-3"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="reference"
                      label="Reference"
                      name="reference"
                      className="pb-3"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="balance"
                      label="Balance"
                      name="balance"
                      className="pb-3"
                      value={this.state.balance}
                      onChange={event => this.handleInputChange(event)}
                    />
                  </Grid>
                </>
              )}
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
