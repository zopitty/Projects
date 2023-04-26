import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#f0d3c9",
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "#1A2027",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Overlay = (props) => {
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container rowSpacing={1} columnSpacing={0}>
            <Grid item sx={4}>
              <Item sx={{ fontWeight: "bold", fontSize: 16 }}>
                {props.location1}
              </Item>

              {props.postalCodeLoc1.map((item) => {
                return <Item>{item}</Item>;
              })}
            </Grid>
            <Grid item xs={4}>
              <Item>Distance</Item>

              {props.results.map((item) => {
                return <Item>{item}m</Item>;
              })}
            </Grid>
            <Grid item sx={4}>
              <Item sx={{ fontWeight: "bold", fontSize: 16 }}>
                {props.location2}
              </Item>

              {props.postalCodeLoc2.map((item) => {
                return <Item>{item}</Item>;
              })}
            </Grid>
          </Grid>
          <Button onClick={() => props.setOpen(false)}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};
const ResultsModal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <Overlay
          setOpen={props.setOpen}
          open={props.open}
          results={props.results}
          postalCodeLoc1={props.postalCodeLoc1}
          postalCodeLoc2={props.postalCodeLoc2}
          location1={props.location1}
          location2={props.location2}
        />,
        document.querySelector("#modal-root")
      )}
    </div>
  );
};

export default ResultsModal;
