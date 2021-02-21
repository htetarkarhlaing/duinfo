import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import {
  Container,
  Typography,
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Divider,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { red } from "@material-ui/core/colors";
import RouteShower from "@components/RouteShower";

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
    backgroundColor: "#ffffff",
  },
  headingText: {
    padding: "10px",
    fontWeight: "bolder",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  descText: {
    marginBottom: "10px",
  },
});

const URL = "https://du-server.herokuapp.com";

export default function Posts() {
  const classes = useStyles();
  const router = useRouter();
  const { pid } = router.query;

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
        <Typography variant="h6" className={classes.headingText}>
          Posts/
          {postData && postData !== undefined ? postData[0].post_title : "..."}
        </Typography>
        <Card elevation={0}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
            }
            title={
              postData && postData !== undefined
                ? postData[0].created_by
                : "..."
            }
            subheader={
              postData && postData !== undefined
                ? postData[0].updated_at
                : "..."
            }
          />
          <CardMedia
            className={classes.media}
            image="/du-bg.jpeg"
            title="Du Info"
          />
          <CardContent>
            <Typography variant="h6" color="primary">
              {postData && postData !== undefined
                ? postData[0].post_title
                : "..."}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              ရက်စွဲ -{" "}
              {postData && postData !== undefined ? postData[0].date : "..."}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.descText}
            >
              {postData && postData !== undefined
                ? postData[0].post_desc
                : "..."}
            </Typography>
            <Divider />
            <Typography variant="h6">Routes</Typography>
            {routes && routes !== undefined
              ? routes.map((data, key) => {
                  return <RouteShower key={key} id={data.route_id} name={data.route_name} path={data.route_path} />;
                })
              : "No Route Avaliable"}
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}
