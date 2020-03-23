import React, { Component } from 'react';
import Layout from '../../Components/Layout';

import { RadioGroup, FormControl, FormControlLabel, Radio, Button } from '@material-ui/core';
import { useStyles } from '../../Utilities/useStyles';
import clsx from 'clsx';
import { updatePrimaryAccount } from '../../Services/account';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { StyledRadio } from '../../Utilities/styledRadio';

class EditPrimary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      oldAccount: '',
      newAccount: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;

    console.log(inputName + ' ' + value);
    this.setState({
      [inputName]: value
    });
  }

  componentDidMount() {
    const allAccounts = this.props.location.state;
    console.log(allAccounts);
    const oldAcc = allAccounts.filter((value) => value.primary);
    console.log(oldAcc);
    const oldAccount = oldAcc[0]._id;
    const accounts = allAccounts.filter((value) => !value.primary);

    this.setState({
      oldAccount,
      accounts
    });
  }

  async setData(event){
    event.preventDefault();
    let result = true;  
    const data = Object.assign({}, this.state);
    delete data.accounts;
    try {
      if(this.state.newAccount != ''){
        result = await updatePrimaryAccount(data);
      }
      if(result) {
        this.props.history.push({
          pathname: '/accounts'
        });
      }
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Layout>
        <Breadcrumb>
          <Breadcrumb.Item href="/accounts">Accounts</Breadcrumb.Item>
          <Breadcrumb.Item className="disable-breadcrumb">Change Primary Account</Breadcrumb.Item>
        </Breadcrumb>
        <h4 className="pl-2 pb-4">Change your primary account</h4>
        <form onSubmit={event => this.setData(event)}>
        <FormControl component="fieldset">
          {this.state.accounts.length > 0 ? (
              this.state.accounts.map(single => {
                return (
                  <RadioGroup
                    name="newAccount"
                    key={single._id}
                    required
                  >
                    <FormControlLabel
                      value={single._id}
                      control={<StyledRadio />}
                      label={single.accountID.accountNumber + ' - ' + single.accountID.type}
                      onChange={event => this.handleInputChange(event)}
                    />
                  </RadioGroup>
                );
              })
            ) : (
              <p>There are no accounts to change to primary</p>
            )}
        </FormControl>
        <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
          Change Primary Account
        </Button>
        </form>
      </Layout>
    );
  }
}

export default EditPrimary;
