import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { DirectionsWalk } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";

// style={{ background: "#665957" }}
const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="insert" aria-label="logo">
          <DirectionsWalk />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          twoShops
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
