import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  TextField,
} from "@material-ui/core";
import AdminHeader from "@components/AdminHeader";
import Cookies from "js-cookie";
import { useRouter } from 'next/router'

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
  form: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
  },
  formController: {
    marginTop: "10px",
    lineHeight: 1.5,
  },
  button: {
    marginTop: "10px",
  },
});

const PostCreate = () => {
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

  const [postData, setPostData] = useState({
    title: "",
    date: "",
    desc: "",
    note: "",
  });

  const [btnHandler, setBtnHandler] = useState(true);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setPostData({
      ...postData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (postData.title !== "" && postData.date !== "" && postData.desc !== "") {
      setBtnHandler(false);
    } else {
      setBtnHandler(true);
    }
  }, [postData]);

  const postUploader = () => {
    setBtnHandler(true);
    fetch(`${URL}/api/posts/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postData.title,
        desc: postData.desc,
        date: postData.date,
        note: postData.note,
        author: Cookies.get("username") || "Admin",
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success === true) {
          window.alert("Success!");
        } else {
          window.alert("Failed!");
        }
      })
      .catch((err) => {
        window.alert("Opps, something went wrong!");
      });
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>DU INFO | Dagon Student Union Informations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminHeader />
      <Container maxWidth="xl" className={classes.body}>
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <form className={classes.form}>
              <Typography
                variant="h6"
                align="center"
                className={classes.headingText}
              >
                Create New Post
              </Typography>
              {/* username */}
              <FormControl
                variant="outlined"
                className={classes.formController}
              >
                <InputLabel>Post Title</InputLabel>
                <OutlinedInput
                  label="Post Title"
                  variant="outlined"
                  color="primary"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  labelWidth={70}
                  value={postData.title}
                />
              </FormControl>

              <FormControl
                variant="outlined"
                className={classes.formController}
              >
                <InputLabel>Date</InputLabel>
                <OutlinedInput
                  label="Date"
                  variant="outlined"
                  color="primary"
                  type="text"
                  name="date"
                  onChange={handleChange}
                  labelWidth={70}
                  value={postData.date}
                />
              </FormControl>

              <TextField
                id="post-desc"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                name="desc"
                onChange={handleChange}
                className={classes.formController}
                value={postData.desc}
              />

              <FormControl
                variant="outlined"
                className={classes.formController}
              >
                <InputLabel>Note</InputLabel>
                <OutlinedInput
                  label="Note"
                  variant="outlined"
                  color="primary"
                  type="text"
                  name="note"
                  onChange={handleChange}
                  labelWidth={70}
                  value={postData.note}
                />
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={postUploader}
                disabled={btnHandler}
              >
                Upload
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PostCreate;
