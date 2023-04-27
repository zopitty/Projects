import React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

//for mapped items (MUI)
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#f0d3c9",
}));

//for Box centering
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#1A2027",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "90%",
};

const Overlay = (props) => {
  //for close button in Modal
  const handleClose = () => {
    props.setOpen(false);
    props.setPostalCodeLoc1([]);
    props.setPostalCodeLoc2([]);
    props.setResults([]);
    props.setLocation1("");
    props.setLocation2("");
    props.setDistanceSelected("");
  };

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container sx={{ whiteSpace: "nowrap" }} rowSpacing={2}>
            <Grid item xs={5} md={5}>
              <Item sx={{ fontWeight: "bold", fontSize: 16 }}>
                {props.location1}
              </Item>
              {props.postalCodeLoc1.map((item, idx) => {
                return <Item key={idx}>{item}</Item>;
              })}
            </Grid>
            <Grid item xs={2} md={2}>
              <Item sx={{ fontWeight: "bold", fontSize: 16 }}>Distance</Item>
              {props.results.map((item, idx) => {
                return <Item key={idx}>{item}m</Item>;
              })}
            </Grid>
            <Grid item xs={5} md={5}>
              <Item sx={{ fontWeight: "bold", fontSize: 16 }}>
                {props.location2}
              </Item>
              {props.postalCodeLoc2.map((item, idx) => {
                return <Item key={idx}>{item}</Item>;
              })}
            </Grid>
          </Grid>
          <Button onClick={() => handleClose()}>Close</Button>
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
          setPostalCodeLoc1={props.setPostalCodeLoc1}
          setPostalCodeLoc2={props.setPostalCodeLoc2}
          setResults={props.setResults}
          setLocation1={props.setLocation1}
          setLocation2={props.setLocation2}
          setDistanceSelected={props.setDistanceSelected}
        />,
        document.querySelector("#modal-root")
      )}
    </div>
  );
};

export default ResultsModal;
