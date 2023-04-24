import React from "react";

const AllShopsDisplay = (props) => {
  return (
    <div className="row">
      <div className="col-sm-4">{props.idx}</div>
      <div className="col-sm-4">{props.name}</div>
      <div className="col-sm-4">{props.postal}</div>
    </div>
  );
};

export default AllShopsDisplay;
