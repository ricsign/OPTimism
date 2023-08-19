import React, { useState, useEffect } from "react";

function EyeExercises({ onComplete }) {
  const [displayText, setDisplayText] = useState("3");
  const [showCircle, setShowCircle] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ top: 0, left: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [textOptions, setTextOptions] = useState([
    "Now rotate your neck counterclockwise",
    "Now rotate your neck the other way (clockwise)",
    "Now look up and down",
    "Now look left and right",
    "You've completed your eye exercises!",
  ]);



  useEffect(() => {
    if (displayText === "0") {
      setShowCircle(true);
   
    } else {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => (parseInt(prevText) - 1).toString());
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [displayText]);

  const handleCircleClick = () => {
    
   if (showCircle) {
      setClickCount((prevClickCount) => prevClickCount + 1); // Increment clickCount
  
      const positions = [
        { top: "0", left: "0" }, // Top-left
        { top: "calc(100vh - 50px)", left: "calc(100vw - 50px)" }, // Bottom-right
        { top: "0", left: "calc(100vw - 50px)" }, // Top-right
        { top: "calc(100vh - 50px)", left: "0" }, // Bottom-left
      ];
  
      const newPosition = positions[(clickCount + 1) % positions.length];
      setCirclePosition(newPosition); // Update circlePosition
    }

    
  };

  const blackScreenStyles = {
    width: "100vw",
    height: "100vh",
    top: 0,
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "24px",
    position: "relative",
  };

  const whiteCircleStyles = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "white",
    position: "absolute",
    top: circlePosition.top,
    left: circlePosition.left,
    cursor: "pointer",
  };

  const handleBlackScreenClick = () => {
   
   
    setClickCount((prevClickCount) => prevClickCount + 1);

    if (clickCount === 9) {
      onComplete();
    }
  };

  return (
    <div style={blackScreenStyles} onClick={handleBlackScreenClick} >
      {!showCircle ? displayText : ""}
      <p style={{ color: 'white', fontSize: '24px' }}>{clickCount}</p>

      {clickCount >= 4 ? (
        <div style={{ textAlign: "center" }} >
          <p style={{ color: "white", fontSize: "24px" }}>
            {textOptions[clickCount - 4]}
          </p>
        </div>
      ) : showCircle ? (
        <div style={whiteCircleStyles} onClick={handleCircleClick}></div>
      ) : null}
    </div>
  );
}

export default EyeExercises;
