import React from 'react';
import Layout from '../../Components/Layout';
import { Component } from 'react';

import {
  RadioGroup,
  TextField,
  Radio,
  FormControl,
  Grid,
  Button,
  FormControlLabel
} from '@material-ui/core';
import { useStyles } from '../../Utilities/useStyles';
import clsx from 'clsx';

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

class CreateSharedAccount extends Component {
  constructor() {
    super();
    this.state = {
      optionShare: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    let value = event.target.value;

    this.setState({
      [inputName]: value
    });

    console.log(inputName, value, 'INPUT');
  }

  componentDidMount() {
    this.props.changeActiveNav();
  }

  render() {
    return (
      <Layout>
        <h1>Create Shared Account</h1>
        <FormControl component="fieldset">
          <h4 className="pl-2 pt-4 pb-2">Which account would you like to share?</h4>
          <RadioGroup name="optionShare">
            <FormControlLabel
              value="AccountNumber"
              control={<StyledRadio />}
              label="Account Number"
              onChange={event => this.handleInputChange(event)}
            />
            <FormControlLabel
              value="PhoneNumber"
              control={<StyledRadio />}
              label="Phone Number"
              onChange={event => this.handleInputChange(event)}
            />
          </RadioGroup>
        </FormControl>
        {(this.state.optionShare === 'AccountNumber' && (
          <Grid item xs={12} sm={12}>
            <h4 className="pt-3 pb-2">IBAN Number that you would like to share</h4>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="accountNumber"
              label="Account Number"
              name="accountNumber"
              onChange={event => this.handleInputChange(event)}
            />
          </Grid>
        )) ||
          (this.state.optionShare === 'PhoneNumber' && (
            <Grid item xs={12} sm={12}>
              <h4 className="pt-3 pb-2">Phone Number that you would like to share</h4>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                onChange={event => this.handleInputChange(event)}
              />
            </Grid>
          ))}
        <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
          Create Shared Account
        </Button>
      </Layout>
    );
  }
}

export default CreateSharedAccount;
