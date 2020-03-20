import React, { Component } from 'react';
import './style.scss';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { signIn } from './../../Services/authentication';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SignInSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      password: '',
      error: false,
      errorMessage: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
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

    signIn(user)
      .then(data => {
        if(data.user) {
          this.props.updateUserInformation(data.user);
          this.props.history.push('/activity');
        }
        else {
          const error = true;
          const errorMessage = data.error;
          this.setState({
            error,
            errorMessage
          });
        } 
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Container className="layout-width centered-page">
        <h1>Sign In</h1>
        <form onSubmit={event => this.getData(event)}>
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
          {this.state.error && <Alert severity="error">{this.state.errorMessage}</Alert>}
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
        </form>
      </Container>
    );
  }
}

export default SignInSide;
