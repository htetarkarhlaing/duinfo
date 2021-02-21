import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Paper,
  Button,
} from "@material-ui/core";
import Header from "@components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import AdminRouteShower from "@components/AdminRouteShower";

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
  wrapper: {
    margin: "10px",
  },
  headingText: {
    padding: "10px",
    paddingBottom: "5px",
    fontWeight: "bolder",
  },
  bodyText: {
    paddingTop: "5px",
    padding: "10px",
  },
  form: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
  },
  formController: {
    marginTop: "10px",
    lineHeight: 1.5,
  },
  btnBox: {
    padding: "10px",
  },
});

const PostOverview = () => {
  const router = useRouter();
  const classes = useStyles();
  const { pid } = router.query;
  const login = Cookies.get("login");
  const username = Cookies.get("username");

  useEffect(() => {
    if (login !== true && username == "") {
      router.push("/login");
    } else {
      return null;
    }
  }, []);

  const [postData, setPostData] = useState();
  const [routes, setRoutes] = useState();

  useEffect(() => {
    postFetcher();
    routeFetcher();
  }, []);

  const postFetcher = () => {
    fetch(`${URL}/api/posts/${pid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success === true) {
          setPostData(resJson.data);
        } else {
          setPostData(resJson.data);
        }
      })
      .catch((err) => {
        setPostData(undefined);
      });
  };

  const routeFetcher = () => {
    fetch(`${URL}/api/routes/${pid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success === true) {
          console.log(resJson.data);
          setRoutes(resJson.data);
        } else {
          setRoutes(resJson.data);
        }
      })
      .catch((err) => {
        setRoutes(undefined);
      });
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>DU INFO | Dagon Student Union Informations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container maxWidth="xl" className={classes.body}>
        <Grid container justify="center">
          <Grid item xs={12} md={4} className={classes.wrapper}>
            <Paper>
              <Typography className={classes.headingText} variant="h6">
                {postData && postData !== undefined
                  ? postData[0].post_title
                  : "No data"}
              </Typography>
              <Typography className={classes.bodyText} variant="body2">
                {postData && postData !== undefined
                  ? postData[0].post_desc
                  : "No data"}
              </Typography>
              {routes && routes !== undefined
                ? routes.map((data, key) => {
                    return (
                      <AdminRouteShower
                        key={key}
                        id={data.route_id}
                        name={data.route_name}
                        path={data.route_path}
                      />
                    );
                  })
                : "No route Avaliable"}
              <div className={classes.btnBox}>
                <Link href={`/admin/add-routes/${encodeURIComponent(pid)}`}>
                  <Button variant="contained" color="primary">
                    Add More Routes
                  </Button>
                </Link>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PostOverview;
