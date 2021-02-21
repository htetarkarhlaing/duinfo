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

const AddRoutes = () => {
  const classes = useStyles();

  const router = useRouter();
  const login = Cookies.get("login");
  const username = Cookies.get("username");

  const { pid } = router.query;

  useEffect(() => {
    if (login !== true && username == "") {
      router.push("/login");
    } else {
      return null;
    }
  }, []);

  const [routeData, setRouteData] = useState({
    routeName: "",
    routePath: "",
  });

  const [btnHandler, setBtnHandler] = useState(true);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setRouteData({
      ...routeData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (routeData.routeName !== "" && routeData.routePath !== "") {
      setBtnHandler(false);
    } else {
      setBtnHandler(true);
    }
  }, [routeData]);

  const postUploader = () => {
    setBtnHandler(true);
    fetch(`${URL}/api/routes/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        routeName: routeData.routeName,
        routePath: routeData.routePath,
        postId: pid,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
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
                <InputLabel>Route Name</InputLabel>
                <OutlinedInput
                  label="Route Name"
                  variant="outlined"
                  color="primary"
                  type="text"
                  name="routeName"
                  onChange={handleChange}
                  labelWidth={70}
                  value={routeData.routeName}
                />
              </FormControl>

              <TextField
                id="post-desc"
                label="Route Path"
                multiline
                rows={4}
                variant="outlined"
                name="routePath"
                onChange={handleChange}
                className={classes.formController}
                value={routeData.routePath}
              />

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={postUploader}
                disabled={btnHandler}
              >
                Save
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AddRoutes;
