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
import clsx from 'clsx';
import { creatingAccount, userIDAccounts } from '../../Services/account';
import { createTransaction } from '../../Services/transaction';
import { useStyles } from './../../Utilities/useStyles';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import MuiAlert from '@material-ui/lab/Alert';

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


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      accountIDFrom: '',
      accountInfo: '',
      balance: '',
      types: ['Credit', 'Savings', 'Current'],
      type: 'Credit',
      options: ['Existing', 'External'],
      option: 'Existing',
      sharedAccount: false,
      sharedUser: '',
      success: true,
      message: ''
    };
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

    this.setState({
      [inputName]: value
    });
    if (value === 'Credit') {
      this.setState({
        balance: '5000'
      });
    }
  }

  handleAccountFromChange(event) {
    const value = event.target.value;

    const accountSplitted = value.split(' ');
    const accountIDFrom = accountSplitted[0];

    this.setState({
      accountIDFrom
    });
  }

  getInfo() {
    const userID = this.props.userID;

    const account = Object.assign({}, this.state);
    account.userID = userID;

    userIDAccounts(userID)
      .then(account => {
        this.setState({
          accounts: account,
          type: account[0].type,
          accountIDFrom: account[0]._id
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.props.changeActiveNav();
    this.getInfo();
  }

  setData(event) {
    event.preventDefault();
    const userID = this.props.userID;
    const accountNumber = this.randomKey();

    const account = Object.assign({}, this.state);
    account.accountNumber = accountNumber;
    account.userID = userID;
    delete account.types;
    delete account.options;
    account.balance = 0;
    account.accounts = null;
    account.primary = false;

    creatingAccount(account)
    .then((account) => {
      const transaction = {
        accountIDFrom: this.state.accountIDFrom,
        accountNumber: account.accountNumber,
        totalAmount: Number(this.state.balance),
        reference: 'Transfering money',
        endPoint: 'Transfer between accounts',
        category: 'Other',
        schedule: false,
        status: 'Executed',
        dateTransaction: Date.now(),
        colorCategory: 'info',
        phoneNumber: ''
      };

      createTransaction(transaction)
      .then((response) => {
          const { result } = response;
          let message = 'Not enough money';
          if(result) {
            this.props.history.push({
              pathname: '/accounts'
            });
          }
          else {
            this.setState({
              success: false,
              message
            })
          }
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
      
    if(this.state.sharedAccount){
      //userIDFrom userIDTo message
      //createNotification()
    }
  }

  render() {
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
            <FormControl component="fieldset">
              <h4 className="pl-2 pt-4 pb-2">Shared Account</h4>
              <RadioGroup
                name="sharedAccount"
                className="scheduled-transaction"
              >
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
            )
            }
            {this.state.type === 'Credit' ? (
              <Grid item xs={12} sm={12}>
                <div>We offer a 5.000€ starting credit limit</div>
              </Grid>
            ) : (
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
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="balance"
                      label="Balance"
                      name="balance"
                      type="number"
                      value={this.state.balance}
                      onChange={event => this.handleInputChange(event)}
                    />
                  </Grid>
                ) : (
                  <>
                    <h4 className="pl-2 pt-3 pb-2">Add money to your new account</h4>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="iban"
                        label="IBAN"
                        name="iabn"
                        type="number"
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
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="balance"
                        label="Balance"
                        name="balance"
                        type="number"
                        value={this.state.balance}
                        onChange={event => this.handleInputChange(event)}
                      />
                    </Grid>
                  </>
                )}
              </>
            )}
          </Grid>
          {
          (!this.state.success) && 
            <Alert severity="error">{this.state.message}</Alert>
          }
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Create New Account
          </Button>
        </form>
      </Layout>
    );
  }
}

export default AddAccount;
