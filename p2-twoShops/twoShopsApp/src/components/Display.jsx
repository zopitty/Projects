import React, { useState, useEffect } from "react";
import AllShopsDisplay from "./AllShopsDisplay";

const Display = () => {
  const [allShops, setAllShops] = useState([]);

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

  return (
    <div className="container">
      <h1>Where do you want to go today?</h1>
      <div className="row">
        <div className="col-sm-4">Distance input</div>
      </div>
      <div className="row">
        <div className="col-sm-4">First location input</div>
      </div>
      <div className="row">
        <div className="col-sm-4">Second location input</div>
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
