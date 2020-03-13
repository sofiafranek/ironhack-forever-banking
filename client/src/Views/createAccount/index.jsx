import React, { Component } from 'react';
import "./style.scss"

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { creatingAccount } from './../../Services/account';

class CreateAccount extends Component {
  constructor(props) {
    super(props) 
    this.state = {
        types: ['Savings', 'Current', 'Credit'],
        balance: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
}

  handleInputChange(event){
    const inputName = event.target.name; 
    const value = event.target.value; 
    this.setState ({
      [inputName] : value
    })
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

  getData(event){
    event.preventDefault();
    const userID = this.props.location.state.idUser;
    const accountNumber = this.randomKey(15);

    const account = Object.assign({}, this.state);
    account.accountNumber = accountNumber;
    account.userID = userID;

    creatingAccount(account)
    .then(account => {
        this.props.history.push('/dashboard');
    })
    .catch(error =>(
        console.log(error))
    );

  }

  render() {

    return (
      <Container maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <form onSubmit={(event) => this.getData(event)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Type of Account</InputLabel>
                <Select
                name="type" 
                native
                onChange={(event) => this.handleInputChange(event)}
                inputProps={{
                    type: ''
                }}
                >
                {
                    this.state.types.map(type => (
                        <option value={type}>{type}</option>
                    ))
                }
                </Select>
            </FormControl>
              </Grid>
              <h4>add money to your new account</h4>
               <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="externalAccountNo"
                  label="externalAccountNo"
                  name="externalAccountNo"
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  onChange={(event) => this.handleInputChange(event)
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Create Account
            </Button>
          </form>
        </div>
      </Container>
    );
  }
};

export default CreateAccount;
