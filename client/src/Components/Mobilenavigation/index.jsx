import React from 'react';
import './style.scss';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
  root: {
    width: `100%`
  }
});

const Mobilenavigation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={`${classes.root} bottomNavigation`}
    >
      <BottomNavigationAction label="Dashboard" />
      <BottomNavigationAction label="Accounts" />
      <BottomNavigationAction label="Transactions" />
      <BottomNavigationAction label="Cards" />
    </BottomNavigation>
  );
};

export default Mobilenavigation;
