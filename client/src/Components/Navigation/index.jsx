import React from 'react';
import './style.scss';

import { Link, NavLink } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { signOut } from './../../Services/authentication';
import { ToggleButton } from 'react-bootstrap';

const Navigation = props => {
  const handleSignOut = () => {
    signOut()
      .then(() => {
        props.updateUserInformation(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const usertype = props.user.usertype;

  return (
    <>
      <div className="navigation">
        <div className="navigation-top">
          <List>
            {['Activity'].map((text, index) => (
              <NavLink to={`/${text.toLowerCase()}`} key={text} exact>
                <ListItem button className="nav-links">
                  <i className="fas fa-chart-line"></i>
                  <small>Activity</small>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <List>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <i className="fas fa-wallet"></i>
              <small>Accounts</small>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className="menu-hover"
            >
              <Link to="/accounts">
                <MenuItem onClick={handleClose}>Accounts</MenuItem>
              </Link>

              {usertype === 'Premium' ? (
                <Link to="/linked-accounts">
                  <MenuItem onClick={handleClose}>Shared Accounts</MenuItem>
                </Link>
              ) : (
                ''
              )}

              {usertype === 'Premium' ? (
                <Link to="/credit">
                  <MenuItem onClick={handleClose}>Credit</MenuItem>
                </Link>
              ) : (
                ''
              )}

              <Link to="/cards">
                <MenuItem onClick={handleClose}>Cards</MenuItem>
              </Link>
            </Menu>
          </List>
          <List>
            {['Transactions'].map((text, index) => (
              <NavLink to={`/${text.toLowerCase()}`} key={text} exact>
                <ListItem button className="nav-links">
                  <i className="fas fa-exchange-alt"></i>
                  <small>Transactions</small>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <List>
            {['Analytics'].map((text, index) => (
              <NavLink to={`/${text.toLowerCase()}`} key={text} exact>
                <ListItem button className="nav-links">
                  <i className="fas fa-chart-pie"></i>
                  <small>Analytics</small>
                </ListItem>
              </NavLink>
            ))}
          </List>
          {usertype === 'Premium' ? (
            <List>
              {['Exchange Rates'].map((text, index) => (
                <NavLink to={'/exchange-rates'} key={text} exact>
                  <ListItem button className="nav-links">
                    <i className="fas fa-coins"></i>
                    <small>Exchange Rates</small>
                  </ListItem>
                </NavLink>
              ))}
            </List>
          ) : (
            ''
          )}
        </div>
        <div>
          <List>
            {['Notifications'].map((text, index) => (
              <NavLink to={'/notifications'} key={text} exact>
                <ListItem button className="nav-links">
                  <i className="far fa-bell extra-nav-link">
                    <div className="notification-alert"></div>
                    <small className="special-nav-link">Notifications</small>
                  </i>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <List>
            {['Profile'].map((text, index) => (
              <NavLink to={'/profile'} key={text} exact>
                <ListItem button className="nav-links">
                  <i className="far fa-user"></i>
                  <small>Profile</small>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <List>
            {['Log Out'].map((text, index) => (
              <NavLink to={''} key={text} exact onClick={handleSignOut}>
                <ListItem button className="nav-links">
                  <i className="fas fa-sign-out-alt"></i>
                  <small>Log Out</small>
                </ListItem>
              </NavLink>
            ))}
          </List>
        </div>
      </div>
    </>
  );
};

export default Navigation;
