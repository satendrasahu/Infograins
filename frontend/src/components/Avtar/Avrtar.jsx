import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
      justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(-1),
    },
    
  },
}));

export const Avtar = (props)=> {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="Infograins" src={props.userPic} />
    </div>
  );
}
