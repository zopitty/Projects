import React from "react";
import { Box, Typography } from "@mui/material";

const About = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#665957",
    p: 4,
  };
  return <Box sx={style}></Box>;
};

export default About;
