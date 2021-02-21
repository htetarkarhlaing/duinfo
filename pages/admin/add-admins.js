import React from "react";
import Head from "next/head";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Header from "@components/Header";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    padding: 0,
    margin: 0,
    backgroundColor: "#00695f",
  },
  body: {
    width: "100%",
    minHeight: "80vh",
    backgroundColor: "#f0f0f0",
  },
  headingText: {
    padding: "10px",
    fontWeight: "bolder",
  },
});

const AddAdmins = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head>
        <title>DU INFO | Dagon Student Union Informations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container maxWidth="xl" className={classes.body}>
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <Typography>Create New Event</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AddAdmins;
