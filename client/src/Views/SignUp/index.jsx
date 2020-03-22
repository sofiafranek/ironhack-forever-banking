import React, { Component } from 'react';
import Container from '@material-ui/core/Container';

import { Button, TextField, FormControl, Select, Grid, InputLabel } from '@material-ui/core';

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
      password: '',
      dob: '',
      ID: '',
      address: '',
      usertypes: ['Free', 'Premium'],
      usertype: 'Free'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.props.changeActiveNav();
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
    signUp(user)
      .then(user => {
        const idUser = user._id;
        this.props.updateUserInformation(user);
        this.props.history.push({
          pathname: '/create-account',
          state: { idUser: idUser }
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Container className="layout-width sign-up">
        <h1>Sign Up</h1>
        <form onSubmit={event => this.getData(event)}>
          <Grid container spacing={2}>
            <Grid item xs={12} className="pt-3 pb-3">
              <FormControl>
                <InputLabel htmlFor="age-native-simple">What account would you like?</InputLabel>
                <Select name="usertype" native onChange={event => this.handleInputChange(event)}>
                  {this.state.usertypes.map(usertype => (
                    <option value={usertype} key={usertype}>
                      {usertype}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                value={this.state.firstName}
                onChange={event => this.handleInputChange(event)}
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
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="dob"
                value={this.state.dob}
                onChange={event => this.handleInputChange(event)}
                type="date"
                id="dob"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Sign Up
          </Button>
        </form>
      </Container>
    );
  }
}

export default SignUp;
