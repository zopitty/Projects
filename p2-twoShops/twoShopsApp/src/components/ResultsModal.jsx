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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Overlay = (props) => {
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);
  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog
        open={props.open}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth="1000px"
      >
        <DialogTitle id="scroll-dialog-title">Results</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Box sx={{ width: "600px" }}>
              <Grid container rowSpacing={1} columnSpacing={0}>
                <Grid item sx={4}>
                  {props.postalCodeLoc1.map((item) => {
                    return <Item>{item}</Item>;
                  })}
                </Grid>
                <Grid item xs={4}>
                  {props.results.map((item) => {
                    return <Item>{item}m</Item>;
                  })}
                </Grid>
                <Grid item sx={4}>
                  {props.postalCodeLoc2.map((item) => {
                    return <Item>{item}</Item>;
                  })}
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
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
        />,
        document.querySelector("#modal-root")
      )}
    </div>
  );
};

export default ResultsModal;
