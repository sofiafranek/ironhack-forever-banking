import React, { Component } from 'react';
import './style.scss';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { creatingCard } from './../../Services/card';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountID: '',
      cardNumber: '',
      pin: '',
      CVV: '',
      type: ['Savings', 'Current', 'Credit'],
      expiryDate: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleInputChange(event) {}

  componentDidMount() {}

  getData(event) {}

  render() {
    return (
      <Container maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Create Card
          </Typography>
          <form onSubmit={event => this.getData(event)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                      <option value={type}>{type}</option>
                    ))}
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
                  onChange={event => this.handleInputChange(event)}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Create Card
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default CreateAccount;
