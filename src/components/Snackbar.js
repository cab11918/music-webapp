import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
export default function SimpleSnackbar(msg) {
  const [open, setOpen] = React.useState(false);


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };





  return (

      <div>
        <Button onClick={handleClick}>Open simple snackbar</Button>
        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            message="Song added!"
            action={
              <React.Fragment>

                <IconButton size="small" aria-label="close" color="inherit"
                            onClick={handleClose}>
                  <CheckCircleIcon fontSize="small" style={{color:'lightGreen'}}/>
                </IconButton>
              </React.Fragment>
            }
        />
      </div>
  );
}
