import { useStyles } from './useStyles';
import clsx from 'clsx';
import {
    Radio
} from '@material-ui/core';

export const StyledRadio  = (props) => {
    const classes = useStyles();
  
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }
  