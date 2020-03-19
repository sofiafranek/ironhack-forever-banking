import React, { Component } from 'react';
import Layout from '../../Components/Layout';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import {
  RadioGroup,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Radio
} from '@material-ui/core';

import clsx from 'clsx';
import { useStyles } from './../../Utilities/useStyles';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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

class Credit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occupation: '',
      income: '',
      outstandingLoans: false,
      otherCredit: false,
      reasons: ['Build Credit History', 'Improve Credit Score', 'Better APR Rates'],
      reason: 'Build Credit History',
      occupations: [
        'Computers & Technology',
        'Health Care & Allied Health',
        'Education & Social Services',
        'Art & Communications',
        'Trade & Transportation',
        'Management, Business & Finance',
        'Architecture & Civial Engineering',
        'Science',
        'Hospitality, Tourism & Service Industry',
        'Law & Law Enforcement',
        'Other'
      ],
      occupation: 'Computers & Technology',
      finanacialSupport: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;

    if (inputName === 'outstandingLoans') value === 'No' ? (value = false) : (value = true);
    if (inputName === 'otherCredit') value === 'No' ? (value = false) : (value = true);
    if (inputName === 'finanacialSupport') value === 'No' ? (value = false) : (value = true);

    this.setState({
      [inputName]: value
    });
  }

  getData(event) {
    event.preventDefault();
  }

  componentDidMount() {
    this.props.changeActiveNav();
  }

  refresh() {
    window.location.reload();
  }

  render() {
    return (
      <Layout>
        <section className="relative">
          <h1 className="pb-4">Credit</h1>
          <div className="action-container">
            <Link to={`/credit/add-credit`}>
              <Button variant="contained" className="primary">
                <i className="fas fa-plus"></i>
              </Button>
            </Link>
            <Button variant="contained" className="secondary" onClick={this.refresh}>
              <i className="fas fa-sync-alt"></i>
            </Button>
          </div>
        </section>
        <form onSubmit={event => this.getData(event)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} className="pb-4">
              <FormControl>
                <InputLabel htmlFor="age-native-simple">What is the credit for?</InputLabel>
                <Select name="reasons" native onChange={event => this.handleInputChange(event)}>
                  {this.state.reasons.map(reason => (
                    <option value={reason} key={reason}>
                      {reason}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} className="pb-4">
              <FormControl>
                <InputLabel htmlFor="age-native-simple">What is the credit for?</InputLabel>
                <Select name="occupation" native onChange={event => this.handleInputChange(event)}>
                  {this.state.occupations.map(occupation => (
                    <option value={occupation} key={occupation}>
                      {occupation}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="income"
                value={this.state.income}
                onChange={event => this.handleInputChange(event)}
                label="Income"
                type="string"
                id="income"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <h5 className="pl-2 pt-4 pb-2">Do you have any outstanding loans?</h5>
                <RadioGroup name="outstandingLoans">
                  <FormControlLabel
                    value="Yes"
                    control={<StyledRadio />}
                    label="Yes"
                    onChange={event => this.handleInputChange(event)}
                  />
                  <FormControlLabel
                    value="No"
                    control={<StyledRadio />}
                    label="No"
                    onChange={event => this.handleInputChange(event)}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <h5 className="pl-2 pt-4 pb-2">Do you have credit with another bank?</h5>
                <RadioGroup name="otherCredit">
                  <FormControlLabel
                    value="Yes"
                    control={<StyledRadio />}
                    label="Yes"
                    onChange={event => this.handleInputChange(event)}
                  />
                  <FormControlLabel
                    value="No"
                    control={<StyledRadio />}
                    label="No"
                    onChange={event => this.handleInputChange(event)}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <h5 className="pl-2 pt-4 pb-2">Does anyone rely on your for financial support?</h5>
                <RadioGroup name="finanacialSupport">
                  <FormControlLabel
                    value="Yes"
                    control={<StyledRadio />}
                    label="Yes"
                    onChange={event => this.handleInputChange(event)}
                  />
                  <FormControlLabel
                    value="No"
                    control={<StyledRadio />}
                    label="No"
                    onChange={event => this.handleInputChange(event)}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Apply for Credit
          </Button>
        </form>
      </Layout>
    );
  }
}

export default Credit;
