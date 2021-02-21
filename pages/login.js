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
} from "@material-ui/core";
import Header from "@components/Header";
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
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10px",
    marginTop: "20px",
  },
  button: {
    marginTop: "10px",
  },
});

const Login = () => {
  const classes = useStyles();

  const login = Cookies.get("login");
  const username = Cookies.get("username");

  const router = useRouter();

   useEffect(() => {
    if (login === true && username.toString() !== "") {
        router.push("/admin/");
    } else {
        return null
    }
  }, []);

  const [userData, setUserData] = useState({
    phone: "",
    password: "",
  });

  const [btnHandler, setBtnHandler] = useState(true);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (userData.phone !== "" && userData.password !== "") {
      setBtnHandler(false);
    } else {
      setBtnHandler(true);
    }
  }, [userData]);

  const postUploader = () => {
    setBtnHandler(true);
    fetch(`${URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: userData.phone,
        password: userData.password,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success === true) {
          Cookies.set("login", true, { expires: 7 });
          Cookies.set("username", resJson.data[0].user_name, {
            expires: 7,
          });
          window.alert("Login Success!");
          router.push("/admin")
        } else {
          window.alert("Login Failed!");
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
      <Header />
      <Container maxWidth="xl" className={classes.body}>
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <form className={classes.form}>
              <Typography
                variant="h6"
                align="center"
                className={classes.headingText}
              >
                Login
              </Typography>
              <FormControl
                variant="outlined"
                className={classes.formController}
              >
                <InputLabel>Phone</InputLabel>
                <OutlinedInput
                  label="Phone"
                  variant="outlined"
                  color="primary"
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  labelWidth={70}
                  value={userData.phone}
                />
              </FormControl>

              <FormControl
                variant="outlined"
                className={classes.formController}
              >
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  variant="outlined"
                  color="primary"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  labelWidth={70}
                  value={userData.password}
                />
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={postUploader}
                disabled={btnHandler}
              >
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
