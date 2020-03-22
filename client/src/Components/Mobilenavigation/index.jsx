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
        <BottomNavigationAction label="Activity" icon={<i className="fas fa-chart-line"></i>} />
      </Link>
      <Link to="/accounts">
        <BottomNavigationAction label="Accounts" icon={<i className="fas fa-wallet"></i>} />
      </Link>
      <Link to="/transactions">
        <BottomNavigationAction label="Transactions" icon={<i class="fas fa-exchange-alt"></i>} />
      </Link>
      <Link to="/cards">
        <BottomNavigationAction label="Cards" icon={<i className="far fa-credit-card"></i>} />
      </Link>
      <Link to="/notifications">
        <BottomNavigationAction
          label="Notifications"
          icon={
            <i className="far fa-bell">
              <div className="notification-alert-mobile"></div>
            </i>
          }
        />
      </Link>
    </BottomNavigation>
  );
};

export default Mobilenavigation;
