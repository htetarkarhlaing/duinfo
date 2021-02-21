import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";

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

const URL = "https://du-server.herokuapp.com";

export default function Posts() {
  const classes = useStyles();
  const router = useRouter();
  const { pid } = router.query;

  const [routes, setRoutes] = useState();

  const postFetcher = () => {
    fetch(`${URL}/api/routes/${pid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success === true) {
          console.log(resJson);
          setPostDetail(resJson.data);
        } else {
          setPostDetail([]);
        }
      })
      .catch((err) => {
        setPostDetail([]);
      });
  };
  useEffect(() => {
    postFetcher();
  }, []);

  return (
    <div className={classes.root}>
      <Head>
        <title>DU INFO | Dagon Student Union Informations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container maxWidth="xl" className={classes.body}>
        <Typography variant="h6" className={classes.headingText}>
          Posts/{}
        </Typography>
        <Grid container justify="center"></Grid>
      </Container>
      <Footer />
    </div>
  );
}
