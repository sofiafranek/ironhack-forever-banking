import React from 'react';

import Layout from '../Components/Layout';
import Chart from '../Components/Chart';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const SingleAccount = () => {
  return (
    <div>
      <Layout>
        <h1>Single Account Page</h1>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="transactions" title="Transactions">
            <Chart />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fuga.</p>
          </Tab>
          <Tab eventKey="summary" title="Summary">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fuga.</p>
          </Tab>
          <Tab eventKey="personaldetails" title="Personl Details">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fuga.</p>
          </Tab>
          <Tab eventKey="settings" title="Settings">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fuga.</p>
          </Tab>
        </Tabs>
      </Layout>
    </div>
  );
};

export default SingleAccount;
