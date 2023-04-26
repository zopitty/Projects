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

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <IconButton
            size="large"
            edge="start"
            color="insert"
            aria-label="logo"
          >
            <DirectionsWalk />
          </IconButton>
        </Link>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          twoShops
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/about"
            >
              About
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/contact"
            >
              Contact
            </Link>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
