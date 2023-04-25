import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material/";

const Display = () => {
  const [allShops, setAllShops] = useState([]);
  const [distanceSelected, setDistanceSelected] = useState();
  const [location1, setLocation1] = useState();
  const [location2, setLocation2] = useState();

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
  //finish fetch

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
    const convertedD = d * 1000; //meters
    return convertedD;
  };
  //end calculation between 2 points

  //for comparing element in the array then executing the displacement calculation
  const [results, setResults] = useState([]);
  const [postalCodeLoc1, setPostalCodeLoc1] = useState([]);
  const [postalCodeLoc2, setPostalCodeLoc2] = useState([]);
  const handleSubmit = () => {
    allShops.filter(
      (shop) =>
        shop.fields.name.stringValue === location1 ||
        shop.fields.name.stringValue === location2
    );
    const location1Array = [...postalCodeLoc1];
    const location2Array = [...postalCodeLoc2];
    const resultsArray = [...results];
    for (let i = 0; i < allShops.length; i++) {
      for (let j = i + 1; j < allShops.length; j++) {
        if (
          allShops[i].fields.name.stringValue !==
          allShops[j].fields.name.stringValue
        ) {
          const displacement = haversine(
            allShops[i].fields.lat.doubleValue,
            allShops[j].fields.lat.doubleValue,
            allShops[i].fields.long.doubleValue,
            allShops[j].fields.long.doubleValue
          );
          if (displacement < distanceSelected) {
            console.log("counter");
            if (
              !location1Array.includes(allShops[i].fields.postal.stringValue)
            ) {
              location1Array.push(allShops[i].fields.postal.stringValue);
            }
            if (
              !location2Array.includes(allShops[j].fields.postal.stringValue)
            ) {
              location2Array.push(allShops[j].fields.postal.stringValue);
            }
            if (!resultsArray.includes(displacement)) {
              resultsArray.push(displacement);
            }
          }
        }
        setPostalCodeLoc1(location1Array);
        setPostalCodeLoc2(location2Array);
        setResults(resultsArray);
      }
    }
  };
  console.log(postalCodeLoc1);
  console.log(postalCodeLoc2);
  console.log(results);

  return (
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
          InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>,
          }}
          sx={{ width: 200 }}
          className="col-sm-4"
          label="Distance"
          variant="outlined"
          onChange={(e) => {
            setDistanceSelected(e.target.value);
          }}
        />
        <TextField
          sx={{ width: 200 }}
          className="col-sm-4"
          label="Location 1"
          variant="outlined"
          onChange={(e) => {
            setLocation1(e.target.value);
          }}
        />
        <TextField
          sx={{ width: 200 }}
          label="Location 2"
          variant="outlined"
          className="col-sm-4"
          onChange={(e) => {
            setLocation2(e.target.value);
          }}
        />
        <Button
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
  );
};

export default Display;

// {allShops.map((item, idx) => {
//     return (
//       <AllShopsDisplay
//         name={item.fields.name.stringValue}
//         postal={item.fields.postal.stringValue}
//         key={idx}
//         idx={idx}
//       />
//     );
//   })}
