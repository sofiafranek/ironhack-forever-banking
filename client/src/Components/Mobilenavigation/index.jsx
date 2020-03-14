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
      <div>
        <Link to="/dashboard">
          <BottomNavigationAction label="Dashboard" icon={<i className="fas fa-stream"></i>} />
        </Link>
      </div>
      <Link to="/accounts">
        <BottomNavigationAction label="Accounts" icon={<i className="fas fa-wallet"></i>} />
      </Link>
      <Link to="/cards">
        <BottomNavigationAction label="Cards" icon={<i className="fas fa-wallet"></i>} />
      </Link>
    </BottomNavigation>
  );
};

export default Mobilenavigation;
