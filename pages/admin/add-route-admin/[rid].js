import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
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

const AddRouteAdmin = () => {
  const classes = useStyles();

  const router = useRouter();
  const login = Cookies.get("login");
  const username = Cookies.get("username");

  const { rid } = router.query;

  useEffect(() => {
    if (login !== true && username == "") {
      router.push("/login");
    } else {
      return null;
    }
  }, []);

  const [adminId, setAdminId] = useState("pre");

  const [adminList, setAdminList] = useState();

  const adminFetcher = () => {
    fetch(`${URL}/api/admins`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.meta.success === true) {
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
    adminFetcher();
  }, []);

  const [btnHandler, setBtnHandler] = useState(true);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setAdminId(value);
  };

  useEffect(() => {
    if (adminId !== "0") {
      setBtnHandler(false);
    } else {
      setBtnHandler(true);
    }
  }, [adminId]);

  const postUploader = () => {
    setBtnHandler(true);
    fetch(`${URL}/api/route-detail/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminId: adminId,
        routeId: rid,
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
                Add New Admin To Route
              </Typography>
              {/* username */}
              <FormControl className={classes.selecterWrapper}>
                <InputLabel id="select-label">Branch</InputLabel>
                <Select
                  labelId="select-label"
                  value={adminId}
                  onChange={handleChange}
                  className={classes.selecter}
                >
                    <MenuItem value="pre">Select An Admin</MenuItem>
                  {adminList ? (
                    adminList.map((data, key) => {
                      return (
                        <MenuItem value={data.admin_id} key={key}>
                          {data.admin_name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem value="pre">No Admin Found</MenuItem>
                  )}
                </Select>
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
        </Grid>
      </Container>
    </div>
  );
};

export default AddRouteAdmin;
