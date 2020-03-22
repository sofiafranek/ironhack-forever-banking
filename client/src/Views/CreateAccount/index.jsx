import React, { Component, Fragment } from 'react';
import './style.scss';
import {
  RadioGroup,
  Button,
  TextField,
  FormControl,
  Select,
  Grid,
  FormControlLabel,
  InputLabel,
  Radio,
  Container
} from '@material-ui/core';
import clsx from 'clsx';
import { creatingAccountFromExternal } from '../../Services/account';
import { creatingCard } from '../../Services/card';
import { useStyles } from '../../Utilities/useStyles';

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Current',
      types: ['Current', 'Savings'],
      balance: '',
      sharedAccount: false,
      sharedUser: '',
      currency: 'CAD'
    };
    this.currencies = [
      'CAD',
      'HKD',
      'ISK',
      'PHP',
      'DKK',
      'HUF',
      'CZK',
      'GBP',
      'RON',
      'SEK',
      'IDR',
      'INR',
      'BRL',
      'RUB',
      'HRK',
      'JPY',
      'THB',
      'CHF',
      'EUR',
      'MYR',
      'BGN',
      'TRY',
      'CNY',
      'NOK',
      'NZD',
      'ZAR',
      'USD',
      'MXN',
      'SGD',
      'AUD',
      'ILS',
      'KRW',
      'PLN'
    ];
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setData = this.setData.bind(this);
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    let value = event.target.value;
    if (inputName === 'sharedAccount') value === 'No' ? (value = false) : (value = true);

    this.setState({
      [inputName]: value
    });

    if (value === 'Credit') {
      this.setState({
        balance: '5000'
      });
    }
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
    return Math.floor(Math.random() * 9000000000000000) + 1000000000000000;
  }

  generateCVV() {
    return Math.floor(Math.random() * 900) + 100;
  }

  generateExpiryDate() {
    return 21;
  }
  
  async setData(event) {
    event.preventDefault();
    const userID = this.props.location.state.idUser;
    const accountNumber = this.randomKey();

    const account = Object.assign({}, this.state);
    account.accountNumber = accountNumber;
    account.userID = userID;
    account.primary = true;
    account.balance = Number(this.state.balance);
    console.log(account, 'ACCOUNT');

    try {
      const response = await creatingAccountFromExternal(account);
      const { result } = response;

      if (result) {
        const { accountID, type } = response;
        const cardNumber = this.generateCardNumber();
        const CVV = this.generateCVV();
        const expiryDate = this.generateExpiryDate();

        const card = {
          cardNumber,
          CVV,
          accountID,
          type,
          expiryDate,
          userID
        };

        await creatingCard(card);
        this.props.history.push('/summary');
      } else {
        //TODO --> CHECK WHEN IS SHARED ACCOUNT AND THE USER DOESNT EXIST
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const usertype = this.props.user.usertype;
    return (
      <Container className="layout-width centered-page">
        <h1 className="mb-4">Create an Account</h1>
        <form onSubmit={event => this.setData(event)}>
          <Grid>
            <Grid item xs={12} sm={12}>
              <FormControl className="mb-4">
                <InputLabel htmlFor="age-native-simple">Type of Account</InputLabel>
                <Select name="type" native onChange={event => this.handleInputChange(event)}>
                  {this.state.types.map(type => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Currency</InputLabel>
                <Select name="currency" native onChange={event => this.handleInputChange(event)}>
                  {this.currencies.map(currency => (
                    <option value={currency} key={currency}>
                      {currency}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {usertype === 'Premium' && (
                <FormControl component="fieldset">
                  <h4 className="pl-2 pt-4 pb-2">Shared Account</h4>
                  <RadioGroup name="sharedAccount" className="scheduled-transaction">
                    <FormControlLabel
                      value="Yes"
                      control={<StyledRadio />}
                      label="Yes"
                      onChange={event => this.handleInputChange(event)}
                    />
                    <FormControlLabel
                      value="No"
                      control={<StyledRadio />}
                      label="No"
                      onChange={event => this.handleInputChange(event)}
                    />
                  </RadioGroup>
                </FormControl>
              )}
              {this.state.sharedAccount && (
                <Fragment>
                  <h4 className="pl-2 pt-4 pb-2">User Phone Number</h4>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      type="number"
                      variant="outlined"
                      required
                      fullWidth
                      id="sharedUser"
                      label="sharedUser"
                      name="sharedUser"
                      onChange={event => this.handleInputChange(event)}
                    />
                  </Grid>
                </Fragment>
              )}
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
                  type="number"
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
