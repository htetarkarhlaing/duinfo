import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Post from "@components/Post";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    padding: 0,
    margin: 0,
    backgroundColor: '#00695f'
  },
  body: {
    width: '100%',
    minHeight: '80vh',
    backgroundColor: '#f0f0f0'
  },
  headingText: {
    padding: '10px',
    fontWeight: 'bolder'
  }
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Head>
        <title>DU INFO || Dagon Student Union Informations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container maxWidth="xl" className={classes.body}>
        <Typography variant="h6" className={classes.headingText}>Posts</Typography>
        <Grid container justify="center">
          <Post />
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
