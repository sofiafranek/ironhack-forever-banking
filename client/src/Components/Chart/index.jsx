import React from 'react';
import './style.scss';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

//http://recharts.org/en-US/guide/installation

const Chart = (props) => {
  const { dates } = props;
  console.log(props, "CHART");
  return (
    <React.Fragment>
      <LineChart width={300} height={300} data={dates}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </React.Fragment>
  );
};

export default Chart;
