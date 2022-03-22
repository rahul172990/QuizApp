import React, { useState, useEffect } from "react";
import questions from "../../src/questions/questions";
import "../App.css";

const StarRating = ({ diff }) => {
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (questions[diff]?.difficulty == "easy") {
      setHover(1);
    } else if (questions[diff]?.difficulty == "medium") {
      setHover(2);
    } else {
      setHover(3);
    }
  }, [diff]);

  return (
    <div className="star-rating">
      {[...Array(3)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            id="starBtn"
            key={index}
            className={index <= hover ? "on" : "off"}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
