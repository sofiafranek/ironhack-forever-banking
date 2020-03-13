import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { signIn } from './../../Services/authentication';
import Copyright from '../../Components/Copyright/Copyright';

class SignInSide extends Component {
  constructor(props){
    super(props);
    this.state = {
      phoneNumber: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.changeActiveNav();
  }

  handleInputChange(event){
    const inputName = event.target.name; 
    const value = event.target.value; 
    this.setState ({
      [inputName] : value
    })
  }

  getData(event){
    event.preventDefault();
    const user = Object.assign({}, this.state);

    signIn(user)
    .then(user => {
      this.props.history.push('/dashboard');
      console.log(user);
    })
    .catch(error =>(
      console.log(error))
    )
  }

  render(){
    return (
      // component="main"
      <Grid container>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={(event) => this.getData(event)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={(event) => this.handleInputChange(event)}
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
                onChange={(event) => this.handleInputChange(event)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
};

export default SignInSide;
