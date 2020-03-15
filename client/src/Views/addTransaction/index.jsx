import React, { Component } from 'react';

import Layout from '../../Components/Layout';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { createTransaction } from '../../Services/transaction';
import { userAccounts } from './../../Services/account';

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: '',
      totalAmount: 0,
      reference: '',
      accountIDFrom: '',
      accounts: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
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
    const userID = this.props.userID;

    userAccounts(userID)
     .then((accounts) => {
       this.setState({
         accounts
       })
     })  
     .catch(error => {
       console.log(error);
     })
    
  }


  getData(event) {
    event.preventDefault();
    const transaction = Object.assign({}, this.state);

    console.log("TRANSACTION VIEW", transaction);

    createTransaction(transaction)
    .then(transaction => {
      this.props.history.push({
        pathname: '/transactions'
      });
    })
    .catch(error => console.log(error));

  }

  render() {
    return (
      <Layout>
        <h1 className="mb-4">Creating a new transaction</h1>
        <form onSubmit={event => this.getData(event)} className="add-account-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
            <FormControl>
                <InputLabel htmlFor="age-native-simple">Account From</InputLabel>
                <Select
                  native
                  onChange={event => this.handleInputChange(event)}
                  name="accountIDFrom"
                  value={this.state.accountIDFrom}
                >
                {
                this.state.accounts.map(account => (
                  <option key={account.accountID}>
                    {account.accountID}
                  </option>
                ))
                }
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <h4 className="pt-3 pb-2">Account Number that you want to transfer</h4>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="accountNumber"
                label="Account Number To"
                name="accountNumber"
                onChange={event => this.handleInputChange(event)}
              />
            </Grid>
            <h4 className="pl-2 pt-3 pb-2">Amount</h4>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="totalAmount"
                label="Total Amount"
                name="totalAmount"
                type="number"
                onChange={event => this.handleInputChange(event)}
              />
            </Grid>
            <h4 className="pl-2 pt-3 pb-2">Reference</h4>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="reference"
                label="Reference"
                name="reference"
                onChange={event => this.handleInputChange(event)}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Create Transaction
          </Button>
        </form>
      </Layout>
    );
  }
}

export default AddTransaction;
