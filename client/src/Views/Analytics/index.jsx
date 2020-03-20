import React from 'react';

import Layout from '../../Components/Layout';
import Chart from '../../Components/Chart';
// import BubbleChart from '../../Components/BubbleChart';

const Analytics = () => {
  return (
    <div>
      <Layout>
        <h1>Analytics</h1>
        {/* <BubbleChart /> */}
        <Chart />
      </Layout>
    </div>
  );
};

export default Analytics;
