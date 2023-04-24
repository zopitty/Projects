import React, { useState, useEffect } from "react";
import AllShopsDisplay from "./AllShopsDisplay";

const Display = () => {
  const [allShops, setAllShops] = useState([]);
  const [distance, setDistance] = useState();
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
  const results = [];
  const postalCodes = [];
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
        // console.log(displacement);
        if (displacement < 50) {
          postalCodes.push(
            allShops[i].fields.postal.stringValue,
            allShops[j].fields.postal.stringValue
          );
          results.push(displacement);
        }
      }
    }
  }
  //   results.sort((a, b) => a - b);
  console.log(postalCodes);
  console.log(results);
  return (
    <div className="container">
      <h1>Where do you want to go today?</h1>
      <div className="row">
        <input className="col-sm-4" placeholder="Distance" />
      </div>
      <div className="row">
        <input className="col-sm-4" placeholder="Location 1" />
      </div>
      <div className="row">
        <input className="col-sm-4" placeholder="Location 2" />
      </div>
      <div className="row">
        <button className="col-sm-2">Let's go</button>
      </div>
    </div>
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
