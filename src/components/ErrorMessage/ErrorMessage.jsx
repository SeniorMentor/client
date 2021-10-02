import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/lab/Alert';

import MuiAlert from '@mui/lab/Alert';
import { makeStyles } from '@mui/styles';

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

export default function ErrorMessage({message,open,setOpen}) {
    const classes = useStyles();
    console.log(open);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
      
  return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant="filled" onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
  );
}
