import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const URL = "https://du-server.herokuapp.com";

const useStyles = makeStyles((theme) => ({
  listWrapper: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const RouteShower = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [admins, setAdmins] = useState();

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    adminFetcher();
  }, []);

  const RouteShower = () => {
    fetch(`${URL}/api/route-detail/${props.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success === true) {
          console.log(resJson);
          setAdmins(resJson.data);
        } else {
          setAdmins([]);
        }
      })
      .catch((err) => {
        setAdmins([]);
      });
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography className={classes.heading}>{props.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List className={classes.listWrapper}>
          <ListItem>
            <ListItemText primary={props.path} />
          </ListItem>
          {admins && admins !== undefined
            ? admins.map((data, key) => {
                return (
                  <React.Fragment key={key}>
                    <ListItem button onClick={handleClick}>
                      <ListItemIcon>
                        <AccountBoxIcon />
                      </ListItemIcon>
                      <ListItemText primary={data.admin_name} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <CallIcon />
                          </ListItemIcon>
                          <ListItemText>
                            <a
                              href={`tel:${data.phone}`}
                              style={{
                                textDecoration: "none",
                                color: "#000000",
                              }}
                            >
                              {data.phone !== "undefined" ? data.phone : "Not Avaliable"}
                            </a>
                          </ListItemText>
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <CallIcon />
                          </ListItemIcon>
                          <ListItemText>
                            <a
                              href={`tel:${data.phone_one}`}
                              style={{
                                textDecoration: "none",
                                color: "#000000",
                              }}
                              disabled={true}
                            >
                              {data.phone_one !== "undefined" ? data.phone_one : "Not Avaliable"}
                            </a>
                          </ListItemText>
                        </ListItem>
                      </List>
                    </Collapse>
                  </React.Fragment>
                );
              })
            : "No Admin Found!"}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default RouteShower;
