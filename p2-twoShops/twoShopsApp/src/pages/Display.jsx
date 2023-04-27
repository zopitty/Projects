import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Stack, Typography } from "@mui/material/";
import ResultsModal from "../components/ResultsModal";

const Display = () => {
  const [allShops, setAllShops] = useState([]); //GET will be set here
  const [distanceSelected, setDistanceSelected] = useState(); //for input distance
  const [location1, setLocation1] = useState(""); //for input location 1
  const [location2, setLocation2] = useState(""); //for input location 2

  //fetching data
  const getData = async () => {
    const res = await fetch(
      "https://firestore.googleapis.com/v1/projects/shops-8d84b/databases/(default)/documents/shops/?pageSize=100"
    );
    const data = await res.json();
    setAllShops(data.documents);
  };
  useEffect(() => {
    getData();
  }, []);

  //calculation between 2 points
  const earthRadius = 6371;
  const convertRadian = (deg) => deg * (Math.PI / 180);
  const haversine = (lat1, lat2, lon1, lon2) => {
    const deltaLat = convertRadian(lat2 - lat1);
    const deltaLon = convertRadian(lon2 - lon1);
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(convertRadian(lat1)) *
        Math.cos(convertRadian(lat2)) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = earthRadius * c;
    const convertedD = Math.round(d * 100000) / 100; //meters
    return convertedD;
  };

  //for comparing element in the array then executing the displacement calculation
  const [results, setResults] = useState([]); //displacement results
  const [postalCodeLoc1, setPostalCodeLoc1] = useState([]); //address of location 1
  const [postalCodeLoc2, setPostalCodeLoc2] = useState([]); //address of location 2
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!location1 || !location2 || !distanceSelected) {
      alert("DON'T");
    } else if (distanceSelected > 1000) {
      alert("PLS DON'T");
    } else {
      //filter out what's needed from fetched data
      const filteredShops = allShops.filter((shop) => {
        return (
          shop.fields.name.stringValue === location1 ||
          shop.fields.name.stringValue === location2
        );
      });
      const location1Array = [...postalCodeLoc1];
      const location2Array = [...postalCodeLoc2];
      const resultsArray = [...results];
      //nested For loop :( to compare elements of the filtered array
      for (let i = 0; i < filteredShops.length; i++) {
        for (let j = i + 1; j < filteredShops.length; j++) {
          if (
            filteredShops[i].fields.name.stringValue !==
            filteredShops[j].fields.name.stringValue
          ) {
            //apply Great Circle formula
            const displacement = haversine(
              filteredShops[i].fields.lat.doubleValue,
              filteredShops[j].fields.lat.doubleValue,
              filteredShops[i].fields.long.doubleValue,
              filteredShops[j].fields.long.doubleValue
            );
            //only push based on maximum distance(aka distanceSelected) set by the user
            if (displacement < distanceSelected) {
              resultsArray.push(displacement);
              location1Array.push(filteredShops[i].fields.postal.stringValue);
              location2Array.push(filteredShops[j].fields.postal.stringValue);
            }
          }
          setPostalCodeLoc1(location1Array);
          setPostalCodeLoc2(location2Array);
          setResults(resultsArray);
          setOpen(true);
        }
      }
    }
  };

  return (
    <>
      {open && (
        <ResultsModal
          setOpen={setOpen}
          open={open}
          results={results}
          postalCodeLoc1={postalCodeLoc1}
          postalCodeLoc2={postalCodeLoc2}
          location1={location1}
          location2={location2}
          setLocation1={setLocation1}
          setLocation2={setLocation2}
          setDistanceSelected={setDistanceSelected}
          setPostalCodeLoc1={setPostalCodeLoc1}
          setPostalCodeLoc2={setPostalCodeLoc2}
          setResults={setResults}
        />
      )}
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        sx={{ margin: 10 }}
      >
        <Stack spacing={4} alignItems="center">
          <Typography variant="h4" sx={{ color: "#f0d3c9" }}>
            Where do you want to go today?
          </Typography>
          <TextField
            sx={{
              width: 200,
              "& .MuiFormLabel-root": {
                color: "#f0d3c9",
              },
              input: { color: "#f0d3c9" },
            }}
            value={distanceSelected}
            className="col-sm-4"
            label="Distance (m)"
            variant="outlined"
            onChange={(e) => {
              setDistanceSelected(e.target.value);
            }}
          />
          <TextField
            sx={{
              width: 200,
              "& .MuiFormLabel-root": {
                color: "#f0d3c9",
              },
              input: { color: "#f0d3c9" },
            }}
            value={location1}
            className="col-sm-4"
            label="Location 1"
            variant="outlined"
            onChange={(e) => {
              setLocation1(e.target.value.toLowerCase());
            }}
          />
          <TextField
            sx={{
              width: 200,
              "& .MuiFormLabel-root": {
                color: "#f0d3c9",
              },
              input: { color: "#f0d3c9" },
            }}
            value={location2}
            label="Location 2"
            variant="outlined"
            className="col-sm-4"
            onChange={(e) => {
              setLocation2(e.target.value.toLowerCase());
            }}
          />
          <Button
            sx={{ backgroundColor: "#4E4443", color: "#f0d3c9" }}
            variant="contained"
            className="col-sm-2"
            onClick={() => {
              handleSubmit();
            }}
          >
            submit
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Display;
