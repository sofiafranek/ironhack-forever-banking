import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { addAccount } from '../../Services/account';

class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: ['Savings', 'Current', 'Credit'],
      balance: ''
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
  }

  randomKey(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getData(event) {
    event.preventDefault();
    const userID = this.props.userID;
    const accountNumber = this.randomKey(15);

    const account = Object.assign({}, this.state);
    account.accountNumber = accountNumber;
    account.userID = userID;

    console.log(account, 'NEW');

    addAccount(account)
      .then(account => {
        this.props.history.push({
          pathname: '/accounts'
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Layout>
        <h1 className="mb-4">Creating a new account</h1>
        <form onSubmit={event => this.getData(event)} className="add-account-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Type of Account</InputLabel>
                <Select
                  name="type"
                  native
                  onChange={event => this.handleInputChange(event)}
                  inputProps={{
                    type: ''
                  }}
                >
                  {this.state.types.map(type => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* need to add logic here if you want to top up with internal account or external account */}
            <Grid item xs={12} sm={12}>
              <h4 className="pt-3 pb-2">Add money to your account</h4>
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Choose to top up using:</InputLabel>
                <Select name="whichaccount" native>
                  <option value="existing">Exisiting Account Here</option>
                  <option value="external">External Account</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <h4 className="pt-3 pb-2">Amount of money you would like to add</h4>
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
            <h4 className="pl-2 pt-3 pb-2">Add money to your new account</h4>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="externalAccountNo"
                label="externalAccountNo"
                name="externalAccountNo"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="externalSortCode"
                label="externalSortCode"
                name="externalSortCode"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="reference"
                label="reference"
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
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Create Account
          </Button>
        </form>
      </Layout>
    );
  }
}

export default AddAccount;
