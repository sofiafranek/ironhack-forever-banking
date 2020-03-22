import React from 'react';
import Layout from '../../Components/Layout';
import { Component } from 'react';
import { addUserToAccount } from '../../Services/account';
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
import MuiAlert from '@material-ui/lab/Alert';
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class CreateSharedAccount extends Component {
  constructor() {
    super();
    this.state = {
      account: null,
      phoneNumber: '',
      message: 'Phone Number not valid',
      success: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    let value = event.target.value;

    this.setState({
      [inputName]: value
    });
  }

  componentDidMount() {
    const account = this.props.history.location.state;
    this.setState({
      account
    })
    this.props.changeActiveNav();
  }

  async setData(event){
    event.preventDefault();
    const data = Object.assign({}, this.state);
    console.log(data);
    delete data.message;
    delete data.sucess;

    try {
      const success = await addUserToAccount(data);
      console.log(success);
      if (success) {
        this.props.history.push('/linked-accounts')
      } else {
        this.setState({
          success
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Layout>
        <h1>Create Shared Account</h1>
        <form onSubmit={(event) => this.setData(event)}>
        <Grid item xs={12} sm={12}>
          <h4 className="pt-3 pb-2">Phone Number that you would like to share</h4>
          <TextField
            type="number"
            variant="outlined"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            onChange={event => this.handleInputChange(event)}
          />
        </Grid>
        {!this.state.success && <Alert severity="error">{this.state.message}</Alert>}
        <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
          Create Shared Account
        </Button>
        </form>
      </Layout>
    );
  }
}

export default CreateSharedAccount;
