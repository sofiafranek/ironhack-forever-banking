import React, { Component } from 'react';
import Layout from '../../Components/Layout';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {
  RadioGroup,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { StyledRadio } from '../../Utilities/styledRadio';

class ApplyForCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 0,
      occupation: '',
      income: 0,
      outstandingLoans: false,
      otherCredit: false,
      type: 'Regular Credit',
      reason: 'Increase Credit Score',
      reasons: ['Increase Credit Score', 'Better Protection for Payments'],
      occupations: [
        'Computers & Technology',
        'Health Care & Allied Health',
        'Education & Social Services',
        'Art & Communications',
        'Trade & Transportation',
        'Management, Business & Finance',
        'Architecture & Civial Engineering',
        'Science',
        'Hospitality, Tourism & Service Industry',
        'Law & Law Enforcement',
        'Other'
      ],
      occupation: 'Computers & Technology',
      statues: ['Single', 'In a relationship', 'Married', 'Divorced', 'Widowed'],
      maritalStatus: 'Single',
      finanacialSupport: false,
      children: false,
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
    this.getData = this.getData.bind(this);
    this.dataCalc = this.dataCalc.bind(this);
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
    let inputName = event.target.name;
    let value = event.target.value;

    if (inputName === 'outstandingLoans') value === 'No' ? (value = false) : (value = true);
    if (inputName === 'otherCredit') value === 'No' ? (value = false) : (value = true);
    if (inputName === 'finanacialSupport') value === 'No' ? (value = false) : (value = true);
    if (inputName === 'children') value === 'No' ? (value = false) : (value = true);

    this.setState({
      [inputName]: value
    });
  }

  dataCalc() {
    let outstanding = 0;
    this.state.outstandingLoans === true ? (outstanding = 0) : (outstanding = 5000);

    let otherCredit = 0;
    this.state.otherCredit === true ? (otherCredit = 0) : (otherCredit = 7500);

    let finanacialSupport = 0;
    this.state.finanacialSupport === true ? (finanacialSupport = 0) : (finanacialSupport = 3000);

    let children = 0;
    this.state.children === true ? (children = 0) : (children = 500);

    let status = 0;
    this.state.maritalStatus === 'Single'
      ? (status = 200)
      : this.state.maritalStatus === 'Married'
      ? (status = 400)
      : this.state.maritalStatus === 'Widowed'
      ? (status = 600)
      : (status = 300);

    let income = 0;
    this.state.income <= 7500
      ? (income = 500)
      : this.state.income <= 10000
      ? (income = 700)
      : this.state.income <= 15000
      ? (income = 1000)
      : this.state.income <= 20000
      ? (income = 1200)
      : this.state.income <= 30000
      ? (income = 30000)
      : (income = 0);

    const limit = outstanding + otherCredit + finanacialSupport + children + status + income;
    return limit;
  }

  createCredit() {
    const userID = this.props.userID;
    const accountNumber = this.randomKey();

    const account = Object.assign({}, this.state);
    account.userID = userID;
    account.type = 'Credit';
    account.accountNumber = accountNumber;

    this.props.history.push({
      pathname: '/credit-acceptance',
      state: { account: account }
    });
  }

  getData(event) {
    event.preventDefault();
    const limit = this.dataCalc();
    this.setState(
      {
        limit: limit
      },
      () => this.createCredit()
    );
  }

  componentDidMount() {
    this.props.changeActiveNav();
  }

  refresh() {
    window.location.reload();
  }

  render() {
    return (
      <Layout>
        <Breadcrumb>
          <Breadcrumb.Item href="/credit">Credit</Breadcrumb.Item>
          <Breadcrumb.Item className="disable-breadcrumb">Applying for Credit</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="pb-4">Apply for Credit</h1>
        <form onSubmit={event => this.getData(event)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} className="pb-4">
              <FormControl>
                <InputLabel htmlFor="age-native-simple">What is the credit for?</InputLabel>
                <Select name="reasons" native onChange={event => this.handleInputChange(event)}>
                  {this.state.reasons.map(reason => (
                    <option value={reason} key={reason}>
                      {reason}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} className="pb-4">
              <FormControl>
                <InputLabel htmlFor="age-native-simple">What is your occupation?</InputLabel>
                <Select name="occupation" native onChange={event => this.handleInputChange(event)}>
                  {this.state.occupations.map(occupation => (
                    <option value={occupation} key={occupation}>
                      {occupation}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                variant="outlined"
                required
                fullWidth
                name="income"
                value={this.state.income}
                onChange={event => this.handleInputChange(event)}
                label="Income"
                id="income"
              />
            </Grid>
            <Grid item xs={12} sm={12} className="pt-4">
              <FormControl>
                <InputLabel htmlFor="age-native-simple">What is your martial status?</InputLabel>
                <Select
                  name="maritalStatus"
                  native
                  onChange={event => this.handleInputChange(event)}
                >
                  {this.state.statues.map(status => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <h5 className="pl-2 pt-4 pb-2">Do you have any children?</h5>
                <RadioGroup name="children">
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
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <h5 className="pl-2 pt-4 pb-2">Do you have any outstanding loans?</h5>
                <RadioGroup name="outstandingLoans">
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
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <h5 className="pl-2 pt-4 pb-2">Do you have credit with another bank?</h5>
                <RadioGroup name="otherCredit">
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
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <h5 className="pl-2 pt-4 pb-2">Does anyone rely on your for financial support?</h5>
                <RadioGroup name="finanacialSupport">
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
            </Grid>
            <Grid item xs={12} sm={12} className="pb-4">
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
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Apply for Credit
          </Button>
        </form>
      </Layout>
    );
  }
}

export default ApplyForCredit;
