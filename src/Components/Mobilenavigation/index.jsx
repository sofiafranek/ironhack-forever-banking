import React from 'react';
import './style.scss';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// add icon to the bottom nativation action bar to include a logo
// icon={<FavoriteIcon />}

const useStyles = makeStyles({
  root: {
    width: 500
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
      className={classes.root}
    >
      <BottomNavigationAction label="Dashboard" />
      <BottomNavigationAction label="Analytics" />
      <BottomNavigationAction label="Accounts" />
    </BottomNavigation>
  );
};

export default Mobilenavigation;
