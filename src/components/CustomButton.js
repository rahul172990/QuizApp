import React from "react";
import "../App.css";

const CustomButton = (props) => {
  return (
    <button className="next-button-style" onClick={props.onClick}>
      {props?.qIndex < 19 ? "Next Question" : "Submit"}
    </button>
  );
};

export default CustomButton;
