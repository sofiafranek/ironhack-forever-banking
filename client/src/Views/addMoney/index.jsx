import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { addingMoney, userIDAccounts } from '../../Services/account';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

class addMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      accountID: '',
      accountInfo: '',
      balance: '',
      options: ['Existing', 'External'],
      option: 'Existing'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
    this.handleAccountFromChange = this.handleAccountFromChange.bind(this);
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
    this.getInfo();
  }

  handleAccountFromChange(event) {
    const value = event.target.value;

    const accountSplitted = value.split(' ');
    const accountID = accountSplitted[0];

    this.setState({
      accountID
    });
  }

  getInfo() {
    const userID = this.props.userID;
    console.log(userID, 'USERID');

    const account = Object.assign({}, this.state);
    account.userID = userID;

    console.log("getInfo")
    userIDAccounts(userID)
      .then(account => {
        console.log(account, 'USERIDACCOUNTS');
        this.setState({
          accounts: account,
          type: account[0].type,
          accountIDFrom: account[0]._id
        });
      })
      .catch(error => console.log(error));
  }

  getData(event) {
    event.preventDefault();
    const accountID = this.state.accountID;
    const balance = this.state.balance;

    const info = { accountID, balance };

    addingMoney(info)
      .then(() => {
        this.props.history.push({
          pathname: '/accounts'
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Layout>
        <Breadcrumb>
          <Breadcrumb.Item href="/accounts">Accounts</Breadcrumb.Item>
          <Breadcrumb.Item className="disable-breadcrumb">Adding Money to Account</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="mb-4">Add Money to Account</h1>
        <form onSubmit={event => this.getData(event)} className="add-account-form">
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
                <h4 className="pt-4 pb-2">Amount of money you would like to add</h4>
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
                <h4 className="pt-4 pb-2">Add money to your new account</h4>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className="pb-3"
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
                    className="pb-3"
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
                    className="pb-3"
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
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Add Money to Account
          </Button>
        </form>
      </Layout>
    );
  }
}

export default addMoney;
