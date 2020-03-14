import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { signUp } from './../../Services/authentication';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      phoneNumber: '',
      lastName: '',
      email: '',
      nationality: '',
      occupation: '',
      password: '',
      date: '',
      ID: '',
      address: ''
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

  getData(event) {
    event.preventDefault();
    const user = Object.assign({}, this.state);
    console.log(user);

    signUp(user)
      .then(user => console.log(user))
      .catch(error => console.log(error));
  }

  render() {
    return (
      // component="main"
      <Container maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={event => this.getData(event)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={this.state.lastName}
                  onChange={event => this.handleInputChange(event)}
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={event => this.handleInputChange(event)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
              {/*              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type='date'
                  value={this.state.date}
                  onChange={(event) => this.handleInputChange(event)
                  }
                  id="dateOfbirtth"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="nationality"
                  value={this.state.nationality}
                  onChange={event => this.handleInputChange(event)}
                  label="Nationality"
                  type="string"
                  id="nationality"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="ID"
                  value={this.state.ID}
                  onChange={event => this.handleInputChange(event)}
                  label="ID"
                  type="string"
                  id="ID"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="address"
                  value={this.state.address}
                  onChange={event => this.handleInputChange(event)}
                  label="Address"
                  type="string"
                  id="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="occupation"
                  value={this.state.occupation}
                  onChange={event => this.handleInputChange(event)}
                  label="Occupation"
                  type="string"
                  id="occupation"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={event => this.handleInputChange(event)}
                  label="Phone Number"
                  type="string"
                  id="phoneNumber"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default SignUp;
