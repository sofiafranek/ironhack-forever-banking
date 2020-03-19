import React from 'react';
import './style.scss';

import { Link } from 'react-router-dom';

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
      <Link to="/activity">
        <BottomNavigationAction icon={<i className="fas fa-chart-line"></i>} />
      </Link>
      <Link to="/accounts">
        <BottomNavigationAction icon={<i className="fas fa-wallet"></i>} />
      </Link>
      <Link to="/transactions">
        <BottomNavigationAction icon={<i className="fas fa-arrows-alt-h"></i>} />
      </Link>
      <Link to="/cards">
        <BottomNavigationAction icon={<i className="far fa-credit-card"></i>} />
      </Link>
      <Link to="/notifications">
        <BottomNavigationAction icon={<i className="far fa-bell"></i>} />
      </Link>
    </BottomNavigation>
  );
};

export default Mobilenavigation;
