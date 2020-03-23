import React, { Component } from 'react';
import './style.scss';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Layout from '../../Components/Layout';
import { creatingCard } from '../../Services/card';
import { userActiveAccounts } from '../../Services/account';
import { creditAccounts } from '../../Services/credit';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      accountID: '',
      type: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  flip = () => {
    this.setState({ flipped: !this.state.flipped });
  };

  generateCardNumber() {
    return Math.floor(Math.random() * 9000000000000000) + 1000000000000000;
  }

  generateCVV() {
    return Math.floor(Math.random() * 900) + 100;
  }

  generateExpiryDate() {
    const currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    if (month < 10) month = '0' + month;
    const year = currentDate.getFullYear() + 2;
    const expiryYear = year.toString().substring(2, 4);
    return month + '/' + expiryYear;
  }

  handleInputChange(event) {
    // const inputName = event.target.name;
    const value = event.target.value;

    const accountSplitted = value.split(' ');
    const accountID = accountSplitted[0];
    const type = accountSplitted[1];

    this.setState({
      accountID,
      type
    });
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const userID = this.props.userID;
    try {
      const account = await userActiveAccounts(userID);
      const accounts = account.map(value => value.accountID);
      const credits = await creditAccounts(userID);
      const allAccounts = accounts.concat(credits);
      this.setState({
        accounts: allAccounts,
        type: accounts[0].type,
        accountID: accounts[0]._id
      });
    } catch (error) {
      console.log(error);
    }
  }

  setData(event) {
    event.preventDefault();
    const cardNumber = this.generateCardNumber();
    const CVV = this.generateCVV();
    const expiryDate = this.generateExpiryDate();
    const userID = this.props.userID;

    const card = {
      cardNumber,
      CVV,
      accountID: this.state.accountID,
      type: this.state.type,
      expiryDate,
      userID
    };

    creatingCard(card)
      .then(card => {
        this.props.history.push('/cards');
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Layout>
        <Breadcrumb>
          <Breadcrumb.Item href="/cards">Cards</Breadcrumb.Item>
          <Breadcrumb.Item className="disable-breadcrumb">Create a New Card</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="mb-4">Create a New Card</h1>
        {this.state.accounts && this.state.accounts.length > 0 && (
          <form onSubmit={event => this.setData(event)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <InputLabel htmlFor="age-native-simple">Type of Card</InputLabel>
                  <Select
                    name="accountInfo"
                    native
                    onChange={event => this.handleInputChange(event)}
                  >
                    {this.state.accounts.map(acc => (
                      <option value={acc._id + ' ' + acc.type} key={acc.accountNumber}>
                        {acc.accountNumber + ' ' + acc.type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
              Create New Card
            </Button>
          </form>
        )}
      </Layout>
    );
  }
}

export default CreateCard;
