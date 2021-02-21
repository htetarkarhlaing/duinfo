import React from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Grid,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import LaunchIcon from "@material-ui/icons/Launch";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Post(props) {
  const classes = useStyles();

  return (
    <Grid item sm={12} md={4} style={{marginBottom: '10px'}}>
       <Link href={`/posts/${encodeURIComponent(props.id)}`}>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
            }
            title={props.author}
            subheader={props.updated}
          />
          <CardMedia
            className={classes.media}
            image="/du-bg.jpeg"
            title="Du Info"
          />
          <CardContent>
            <Typography variant="h6" color="primary">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              ရက်စွဲ - {props.date}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {props.desc}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="open">
              <LaunchIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  );
}
