import React, { Component } from 'react';
import './style.scss';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

class Summary extends Component {
  componentDidMount() {
    this.props.changeActiveNav();
  }

  // handleInputChange(event) {
  //   const inputName = event.target.name;
  //   const value = event.target.value;
  //   this.setState({
  //     [inputName]: value
  //   });
  // }

  // getData(event) {
  //   event.preventDefault();
  //   const user = Object.assign({}, this.state);

  //   signIn(user)
  //     .then(user => {
  //       this.props.updateUserInformation(user);
  //       this.props.history.push('/dashboard');
  //     })
  //     .catch(error => console.log(error));
  // }

  render() {
    return (
      <Container className="layout-width centered-page">
        <h1>Summary</h1>
        <h4>Your New Account</h4>
        <h5>IBAN Number: ______</h5>
        <h5>Account Type: ______</h5>
        <h4>Your New Card</h4>
        <h5>Card Number: ______</h5>
        <h5>Card Expiry: ______</h5>
        <h5>Pin: ______</h5>
        {/* <form onSubmit={event => this.getData(event)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            value={this.state.phoneNumber}
            onChange={event => this.handleInputChange(event)}
            autoComplete="phoneNumber"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={this.state.password}
            onChange={event => this.handleInputChange(event)}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-3 mb-3">
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form> */}
      </Container>
    );
  }
}

export default Summary;
