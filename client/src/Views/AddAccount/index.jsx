import React, { Component, Fragment } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import {
  RadioGroup,
  Button,
  TextField,
  FormControl,
  Select,
  Grid,
  FormControlLabel,
  InputLabel,
  Radio
} from '@material-ui/core';
import {
  creatingAccountFromInternal,
  creatingAccountFromExternal,
  userActiveAccounts
} from '../../Services/account';
import { createNotification } from '../../Services/notification';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import getSymbolFromCurrency from 'currency-symbol-map';
import { StyledRadio } from '../../Utilities/styledRadio';
import { Alert } from '../../Utilities/alert';
import { replaceAll } from '../../Utilities/replaceAll';

class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      accountIDFrom: '',
      accountInfo: '',
      balance: '',
      types: ['Current', 'Savings'],
      type: 'Current',
      options: ['Existing', 'External'],
      option: 'Existing',
      sharedAccount: false,
      sharedUser: '',
      success: true,
      message: '',
      currency: 'CAD',
      currencySymbol: '$'
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
    this.handleAccountFromChange = this.handleAccountFromChange.bind(this);
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

  handleInputChange(event) {
    const inputName = event.target.name;
    let value = event.target.value;
    if (inputName === 'sharedAccount') value === 'No' ? (value = false) : (value = true);
    if (inputName === 'balance') value = replaceAll(value, ',', '');

    this.setState({
      [inputName]: value
    });
  }

  handleInputCurrencyChange(event) {
    const inputName = event.target.name;
    let value = event.target.value;
    const currencySymbol = getSymbolFromCurrency(value);

    this.setState({
      [inputName]: value,
      currencySymbol
    });
  }

  handleAccountFromChange(event) {
    const value = event.target.value;

    const accountSplitted = value.split(' ');
    const accountIDFrom = accountSplitted[0];
    const currencySymbol = getSymbolFromCurrency(accountSplitted[2]);

    this.setState({
      accountIDFrom,
      currencySymbol
    });

  }

  getInfo() {
    const userID = this.props.user._id;

    const account = Object.assign({}, this.state);
    account.userID = userID;

    userActiveAccounts(userID)
      .then(account => {
        console.log(account);
        const accounts = account.map(value => value.accountID);
        this.setState({
          accounts,
          type: accounts[0].type,
          accountIDFrom: accounts[0]._id
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.props.changeActiveNav();
    this.getInfo();
  }

  async setData(event) {
    event.preventDefault();
    const userID = this.props.user._id;
    const accountNumber = this.randomKey();

    const account = Object.assign({}, this.state);
    account.accountNumber = accountNumber;
    account.userID = userID;
    delete account.types;
    delete account.options;
    account.accounts = null;
    account.primary = false;

    let response = null;

    if (this.state.option === 'Existing') response = await creatingAccountFromInternal(account);
    else {
      response = await creatingAccountFromExternal(account);
    }

    const { result } = response;
    let insuccessMessage = '';

    if (result) {
      if (this.state.sharedAccount) {
        const { userID, userName } = response;
        const userIDFrom = this.props.user._id;
        const userIDTo = userID;
        const userNameFrom = this.props.user.name;
        const userNameShared = userName;
        const messageTo = `${userNameFrom} created an shared account with you`;
        const messageFrom = `You just created an account with ${userNameShared}`;

        const notification = {
          userIDFrom,
          userIDTo,
          messageTo,
          messageFrom
        };

        try {
          await createNotification(notification);
        } catch (error) {
          console.log(error);
        }
      }
      this.props.history.push({
        pathname: '/transactions'
      });
      this.props.history.push({
        pathname: '/accounts'
      });
    } else {
      const { message } = response;
      if (message === 0) {
        insuccessMessage = 'Not enough money';
      } else {
        insuccessMessage = 'User doesnt exist';
      }
      this.setState({
        success: false,
        message: insuccessMessage
      });
    }
  }

  render() {
    const usertype = this.props.user.usertype;
    return (
      <Layout>
        <Breadcrumb>
          <Breadcrumb.Item href="/accounts">Accounts</Breadcrumb.Item>
          <Breadcrumb.Item className="disable-breadcrumb">Creating a New Account</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="mb-4">Creating a New Account</h1>
        <form onSubmit={event => this.setData(event)} className="add-account-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={12}>
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Currency</InputLabel>
                <Select name="currency" native onChange={event => this.handleInputCurrencyChange(event)}>
                  {this.currencies.map(currency => (
                    <option value={currency} key={currency}>
                      {currency}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
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
            <>
              <Grid item xs={12} sm={12}>
                <h4 className="pt-3 pb-2">Add money to your account</h4>
                <FormControl>
                  <InputLabel htmlFor="age-native-simple">Choose to top up using:</InputLabel>
                  <Select name="option" native onChange={event => this.handleInputChange(event)}>
                    {this.state.options.map(option => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {this.state.option === 'Existing' ? (
                <Grid item xs={12} sm={12}>
                  <h4 className="pt-3 pb-2">Amount of money you would like to add</h4>
                  <FormControl>
                    <Select
                      name="accountInfo"
                      native
                      className="mb-4"
                      onChange={event => this.handleAccountFromChange(event)}
                    >
                      {this.state.accounts.map(acc => (
                        <option value={acc._id + ' ' + acc.type} key={acc.accountNumber}>
                          {acc.accountNumber + ' ' + acc.type}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <Grid item xs={12}>
                    <CurrencyTextField
                      id="balance"
                      name="balance"
                      label="Balance"
                      onChange={event => this.handleInputChange(event)}
                      variant="standard"
                      required
                      decimalCharacter="."
                      digitGroupSeparator=","
                      currencySymbol={this.state.currencySymbol}
                      outputFormat="string"
                    />
                  </Grid>
                </Grid>
              ) : (
                <>
                  <h4 className="pl-2 pt-3 pb-2">Add money to your new account</h4>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      type="number"
                      variant="outlined"
                      required
                      fullWidth
                      id="iban"
                      label="IBAN"
                      name="iabn"
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CurrencyTextField
                      id="balance"
                      name="balance"
                      label="Balance"
                      onChange={event => this.handleInputChange(event)}
                      variant="standard"
                      required
                      decimalCharacter="."
                      digitGroupSeparator=","
                      currencySymbol={this.state.currencySymbol}
                      outputFormat="string"
                    />
                  </Grid>
                </>
              )}
            </>
          </Grid>
          {!this.state.success && <Alert severity="error">{this.state.message}</Alert>}
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Create New Account
          </Button>
        </form>
      </Layout>
    );
  }
}

export default AddAccount;
