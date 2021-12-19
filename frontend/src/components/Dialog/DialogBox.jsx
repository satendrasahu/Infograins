import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { CloseDialog } from "../../actions";
import { useHistory, useParams } from "react-router-dom";
import { indivisualPost } from "../../Service/PostAPI";
import { useState } from "react";
import { CardComp } from "../Card/Card";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const DialogBox = (props) => {
  const dispatch = useDispatch(CloseDialog);
  const history = useHistory();
  const { userId } = useParams();
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('lg');
  const [indivisualPostData, setIndivisualPostData] = useState([]);
  const mystate = useSelector((state) => state.changeTheDialogStatus);

  const handleClose = () => {
    dispatch(CloseDialog(false));
    history.push("/");
  };

  useEffect(async () => {
    const result = await indivisualPost(userId);
    if (result) {
      setIndivisualPostData(result);
      console.log("radhey.................", result);
    }
  }, [userId]);

  
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={mystate}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleClose}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Recent Posts
        </DialogTitle>
        <DialogContent>
          <CardComp PostData={indivisualPostData} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{
            handleClose()
            history.push(`user/${userId}`)
            }} color="primary"
            variant="contained"
            >
            All Post
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
