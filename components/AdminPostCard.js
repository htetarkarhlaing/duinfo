import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  IconButton,
  makeStyles,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Moment from "react-moment";
import Link from "next/link"

const useStyle = makeStyles({
  root: {
    margin: "10px",
  },
  wrapper: {
    paddingLeft: "10px",
    paddingTop: "10px",
  },
});

const AdminPostCard = (props) => {
  const classes = useStyle();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = () => {
    alert(props.id);
  };

  return (
    <Grid item xs={12} md={4} className={classes.root}>
      <Paper className={classes.wrapper}>
        <Typography variant="h6">{props.title}</Typography>
        <Typography>
          <Moment date={props.updated} format="MMMM DD, YYYY" />
        </Typography>
        <Link href={`/admin/post-overview/${encodeURIComponent(props.id)}`}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can't be undo.Please
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteHandler} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AdminPostCard;
