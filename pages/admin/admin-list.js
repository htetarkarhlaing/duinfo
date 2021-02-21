import React, { useState, useEffect } from "react";
import Head from "next/head";
import AdminHeader from "@components/AdminHeader";
import Footer from "@components/Footer";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import AdminCard from "@components/AdminCard";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const URL = "https://du-server.herokuapp.com";

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

export default function AdminHome() {
  const router = useRouter();
  const login = Cookies.get("login");
  const username = Cookies.get("username");

  useEffect(() => {
    if (login !== true && username == "") {
      router.push("/login");
    } else {
      return null;
    }
  }, []);
  const classes = useStyles();
  const [adminList, setAdminList] = useState();

  const postFetcher = () => {
    fetch(`${URL}/api/admins`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success === true) {
            console.log(resJson);
          setAdminList(resJson.data);
        } else {
          setAdminList([]);
        }
      })
      .catch((err) => {
        setAdminList([]);
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
      <AdminHeader />
      <Container maxWidth="xl" className={classes.body}>
        <Typography variant="h6" className={classes.headingText}>
          Admin List
        </Typography>
        <Grid container justify="center">
          {adminList && adminList !== undefined && adminList.length !== 0
            ? adminList.map((data, key) => {
                return <AdminCard />;
              })
            : "No admin Found"}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
