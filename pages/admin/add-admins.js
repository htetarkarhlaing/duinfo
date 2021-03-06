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
  Paper,
  Divider,
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

const AddAdmin = () => {
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

  const [adminData, setAdminData] = useState({
    name: "",
    phone: "",
    phoneOne: "",
  });

  const [btnHandler, setBtnHandler] = useState(true);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (adminData.name !== "" && adminData.phone !== "") {
      setBtnHandler(false);
    } else {
      setBtnHandler(true);
    }
  }, [adminData]);

  const postUploader = () => {
    setBtnHandler(true);
    fetch(`${URL}/api/admins/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: adminData.name,
        phoneOne: adminData.desc,
        phoneTwo: adminData.date,
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
                Create New Admin Info
              </Typography>
              <FormControl
                variant="outlined"
                className={classes.formController}
              >
                <InputLabel>Admin Name</InputLabel>
                <OutlinedInput
                  label="Admin Name"
                  variant="outlined"
                  color="primary"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  labelWidth={70}
                  value={adminData.name}
                />
              </FormControl>

              <FormControl
                variant="outlined"
                className={classes.formController}
              >
                <InputLabel>Phone One</InputLabel>
                <OutlinedInput
                  label="Phone One"
                  variant="outlined"
                  color="primary"
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  labelWidth={70}
                  value={adminData.phone}
                />
              </FormControl>

              <FormControl
                variant="outlined"
                className={classes.formController}
              >
                <InputLabel>Phone Two</InputLabel>
                <OutlinedInput
                  label="Phone Two"
                  variant="outlined"
                  color="primary"
                  type="text"
                  name="phoneOne"
                  onChange={handleChange}
                  labelWidth={70}
                  value={adminData.phoneOne}
                />
              </FormControl>

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

          <Grid item xs={12} md={4} className={classes.buttonWrapper}>
            <Divider />
            <Button variant="contained" color="primary">
              Click Here To View Admin List
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AddAdmin;
