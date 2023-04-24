import React, { useState, useEffect } from "react";
import AllShopsDisplay from "./AllShopsDisplay";

const Display = () => {
  const [allShops, setAllShops] = useState([]);
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
  return (
    <div className="container">
      {allShops.map((item, idx) => {
        return (
          <AllShopsDisplay
            name={item.fields.name.stringValue}
            postal={item.fields.postal.stringValue}
            key={idx}
            idx={idx}
          />
        );
      })}
    </div>
  );
};

export default Display;
