import React, { Component } from 'react';

import Layout from '../../Components/Layout';
import Notification from '../../Components/Notification';
import { listNotifications } from './../../Services/notification';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
  }

  async getData() {
    const { userID } = this.props;
    console.log(userID);
    try {
      const notifications = await listNotifications(userID);
      this.setState({
        notifications
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { userID } = this.props;
    return (
      <div>
        <Layout>
          <h1 className="pb-3">Notifications</h1>
          <hr className="pb-3"></hr>
          {this.state.notifications.map(notification => (
            <Notification {...notification} userID={userID} />
          ))}
        </Layout>
      </div>
    );
  }
}

export default Notifications;
