import React, { useState } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

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

export default function AdminHeader() {
  const classes = useStyles();

  const router = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);

  const logoutHandler = () => {
    Cookies.remove("login");
    Cookies.remove("username");
    window.alert("Logout Success.")
    router.push("/login");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          DU Info
        </Typography>
        <IconButton
          edge="end"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => setOpenDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <List style={{width: '60vw'}}>
          <ListItem button onClick={() => {router.push("/admin")}}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => {router.push("/admin/create-post")}}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Create Posts" />
          </ListItem>
          <ListItem button onClick={() => {router.push("/admin/add-admins")}}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Add Admin" />
          </ListItem>
          <ListItem button onClick={() => {router.push("/admin/admin-list")}}>
            <ListItemIcon>
              <FolderSharedIcon />
            </ListItemIcon>
            <ListItemText primary="Admin List" />
          </ListItem>
          <ListItem button onClick={logoutHandler}>
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
