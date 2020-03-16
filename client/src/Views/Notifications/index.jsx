import React from 'react';

import Layout from '../../Components/Layout';
import Notification from '../../Components/Notification';

const Notifications = () => {
  return (
    <div>
      <Layout>
        <h1 className="pb-3">Notifications</h1>
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </Layout>
    </div>
  );
};

export default Notifications;
