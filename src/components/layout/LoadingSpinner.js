import React from "react";
import spinner from "./spinner.gif";

const LoadingSpinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading tracks..."
        style={{ width: "200px", margin: "40px auto", display: "block" }}
      />
    </div>
  );
};

export default LoadingSpinner;
