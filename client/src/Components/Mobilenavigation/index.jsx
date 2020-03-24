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
    <>
      <section className="top-slide-nav">
        <a href="/" className="left">
          <div className="nav--logo-image"></div>
        </a>
        <a href="/notifications" className="right">
          <i className="far fa-bell">
            <div className="notification-alert-mobile-top"></div>
          </i>
        </a>
      </section>
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
        <Link to="/sub-accounts">
          <BottomNavigationAction label="Accounts" icon={<i className="fas fa-wallet"></i>} />
        </Link>
        <Link to="/transactions">
          <BottomNavigationAction
            label="Transactions"
            icon={<i className="fas fa-exchange-alt"></i>}
          />
        </Link>
        <Link to="/cards">
          <BottomNavigationAction label="Cards" icon={<i className="far fa-credit-card"></i>} />
        </Link>
        <Link to="/analytics">
          <BottomNavigationAction label="Analytics" icon={<i className="fas fa-chart-pie"></i>} />
        </Link>
      </BottomNavigation>
    </>
  );
};

export default Mobilenavigation;
