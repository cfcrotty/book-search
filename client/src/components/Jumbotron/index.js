import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: "70%", clear: "both", paddingTop: 20, textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
