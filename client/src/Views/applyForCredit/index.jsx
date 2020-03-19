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
  Radio
} from '@material-ui/core';

import clsx from 'clsx';
import { useStyles } from './../../Utilities/useStyles';

import Button from '@material-ui/core/Button';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { createAccount } from '../../Services/credit';

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

class ApplyForCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      occupation: '',
      income: '',
      outstandingLoans: false,
      otherCredit: false,
      types: ['Buying Goods', 'Investment', 'Mortgage', 'Car'],
      type: 'Buying Goods',
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
      status: 'Single',
      finanacialSupport: false,
      children: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
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

  getData(event) {
    event.preventDefault();

    const userID = this.props.userID;
    const accountNumber = this.randomKey();

    const account = Object.assign({}, this.state);
    account.userID = userID;
    account.type = 'Credit';
    account.accountNumber = accountNumber;

    createAccount(account)
      .then(account => {
        console.log(account, 'CREDIT ACCOUNT');
        this.props.history.push({
          pathname: '/credit'
        });
      })
      .catch(error => console.log(error));
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
                  {this.state.types.map(type => (
                    <option value={type} key={type}>
                      {type}
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
                variant="outlined"
                required
                fullWidth
                name="income"
                value={this.state.income}
                onChange={event => this.handleInputChange(event)}
                label="Income"
                type="number"
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
