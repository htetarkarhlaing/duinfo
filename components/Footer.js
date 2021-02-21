import React from "react";
import { Container, Typography } from "@material-ui/core";

const Footer = () => {
  return (
    <Container style={{padding: '10px', backgroundColor: '#00695f', color: '#ffffff'}}>
      <Typography variant="body2" align="center">
        Code with love for Dagon University Student Union.
      </Typography>
      <Typography variant="h6" align="center" style={{fontWeight: 'bolder'}}>https://du-info.netlify.app</Typography>
    </Container>
  );
};

export default Footer;
