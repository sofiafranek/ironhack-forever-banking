import React from 'react';
import './style.scss';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

//http://recharts.org/en-US/guide/installation

const data = [
  {
    dat: 'Jan',
    total: 4000
  },
  {
    date: 'Feb',
    total: 3000
  },
  {
    date: 'March',
    total: 2000
  },
  {
    date: 'April',
    total: 2780
  },
  {
    date: 'May',
    total: 1890
  },
  {
    date: 'June',
    total: 2390
  },
  {
    date: 'July',
    total: 3490
  },
  {
    date: 'Aug',
    total: 2000
  },
  {
    date: 'Sep',
    total: 2780
  },
  {
    date: 'Oct',
    total: 1890
  },
  {
    date: 'Nov',
    total: 2390
  },
  {
    date: 'Dec',
    total: 3490
  }
];

const Chart = () => {
  return (
    <React.Fragment>
      <LineChart width={900} height={300} data={data}>
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
