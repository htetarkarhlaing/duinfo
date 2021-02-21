import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          DU Info
        </Typography>
        <Link href="/">
          <Button color="inherit">
            <HomeIcon />
          </Button>
        </Link>
        <Link href="/login">
          <Button color="inherit"><AccountCircleIcon/></Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
