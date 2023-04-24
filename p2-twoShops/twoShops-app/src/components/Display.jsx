import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

const Display = () => {
  const [allShops, setAllShops] = useState([]);

  const getData = async () => {
    const res = await fetch(
      "https://firestore.googleapis.com/v1/projects/shops-8d84b/databases/(default)/documents/shops/"
    );
    console.log(res);
    const data = await res.json();
    if (res.status === 200) {
      setAllShops(data);
    } else {
      alert("error");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return <div>{allShops}</div>;
};

export default Display;
