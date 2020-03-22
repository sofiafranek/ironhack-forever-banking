import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { topUpAccount } from '../../Services/account';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class AddMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,      
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
    this.getData();
  }

  getData() {
    
    const { account } = this.props.history.location.state;

    console.log(account);

    this.setState({
      account
    });
  }

  async setData(event) {
    event.preventDefault();
    const { account } = this.state;
    const accountID = account._id;
    const balance = this.state.balance;
    const data = {
      accountID,
      balance
    };

    try {
      await topUpAccount(data);
      this.props.history.push('/accounts');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Layout>
        <Breadcrumb>
          <Breadcrumb.Item href="/accounts">Accounts</Breadcrumb.Item>
          <Breadcrumb.Item className="disable-breadcrumb">Adding Money to Account</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="mb-4">Add Money to Account</h1>
        <form onSubmit={event => this.setData(event)} className="add-account-form">
          {/* <>
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
            </Grid> */}
            {/*this.state.option === 'Existing' ? (
              <Grid item xs={12} sm={12}>
                <h4 className="pt-4 pb-2">Amount of money you would like to add</h4>
                <FormControl>
                  <Select
                    name="accountIDFrom"
                    native
                    className="mb-4"
                    onChange={event => this.handleInputChange(event)}
                  >
                    {this.state.accounts.map(acc => (
                      <option value={acc._id} key={acc.accountNumber}>
                        {acc.accountNumber + ' ' + acc.type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  type="number"
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
            ) : (*/
              <>
                <h4 className="pt-4 pb-2">Add money to your new account</h4>
                <Grid item xs={12} sm={12}>
                  <TextField
                    type="number"
                    className="pb-3"
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
                    type="number"
                    className="pb-3"
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
              </>
            }
            <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Add Money to Account
          </Button>
        </form>
      </Layout>
    );
  }
}

export default AddMoney;
