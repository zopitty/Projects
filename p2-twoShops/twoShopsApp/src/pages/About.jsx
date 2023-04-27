import React from "react";
import { Box, Typography } from "@mui/material";

const About = () => {
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#665957",
    height: 500,
    width: 600,
    p: 4,
  };
  return (
    <Box sx={style}>
      <Typography variant="overline" align="left" sx={{ color: "#f0d3c9" }}>
        Welcome to twoShops! This app is designed to make it easy for you to
        find two shops in close proximity to each other. Here's how it works:
        <br />
        <br />
        1. Choose your two shops
        <br />
        <br />
        2. Set your desired proximity of the two shops.
        <br />
        <br />
        3.Get your results: Once you've entered your preferences, the app will
        generate a list of shops that meet your criteria. You'll be able to see
        each shop's address + distance from the other shop.
        <br />
        <br />
        With twoShops, you can save time and energy by planning your shopping
        trip in advance. No more aimlessly driving around looking for stores –
        our app does the work for you. So why wait? Start using twoShops today
        and discover how easy it is to find the shops you need, right when you
        need them.
      </Typography>
    </Box>
  );
};

export default About;
