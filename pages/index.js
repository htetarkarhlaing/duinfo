import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Post from "@components/Post";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";

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

export default function Home() {
  const classes = useStyles();
  const [posts, setPosts] = useState();

  const postFetcher = () => {
    fetch(`${URL}/api/posts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success === true) {
          setPosts(resJson.data);
        } else {
          setPosts([]);
        }
      })
      .catch((err) => {
        setPosts([]);
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
          Posts
        </Typography>
        <Grid container justify="center">
          {posts && posts !== undefined && posts.length !== 0
            ? posts.map((data, key) => {
                return (
                  <Post
                    key={key}
                    id={data.post_id}
                    author={data.created_by}
                    title={data.post_title}
                    desc={data.post_desc}
                    updated={data.updated_at}
                    date={data.date}
                  />
                );
              })
            : "No Event Avaliable"}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
