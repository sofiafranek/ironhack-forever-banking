import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '65px',
    marginLeft: '240px'
  }
  // toolbar: theme.mixins.toolbar
}));

const Layout = props => {
  const classes = useStyles();
  return <main className={`${classes.content} relative`}>{props.children}</main>;
};

export default Layout;
