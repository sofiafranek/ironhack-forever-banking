import React, { Component } from 'react';
import Layout from '../../Components/Layout';

import { RadioGroup, FormControl, FormControlLabel, Radio, Button } from '@material-ui/core';
import { useStyles } from '../../Utilities/useStyles';
import clsx from 'clsx';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

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

class EditPrimary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      primaryAccount: ''
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
    const account = this.props.location.state;

    this.setState({
      account: account
    });
  }

  render() {
    return (
      <Layout>
        <Breadcrumb>
          <Breadcrumb.Item href="/accounts">Accounts</Breadcrumb.Item>
          <Breadcrumb.Item className="disable-breadcrumb">Change Primary Account</Breadcrumb.Item>
        </Breadcrumb>
        <h4 className="pl-2 pb-4">Change your primary account</h4>
        <FormControl component="fieldset">
          {this.state.account &&
            (this.state.account.length > 0 ? (
              this.state.account.map(single => {
                return (
                  <RadioGroup
                    name="primaryAccount"
                    className="scheduled-transaction"
                    key={single.accountID._id}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<StyledRadio />}
                      label={single.accountID.accountNumber}
                      onChange={event => this.handleInputChange(event)}
                    />
                  </RadioGroup>
                );
              })
            ) : (
              <p>There are no accounts to change to primary</p>
            ))}
        </FormControl>
        <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
          Change Primary Account
        </Button>
      </Layout>
    );
  }
}

export default EditPrimary;
