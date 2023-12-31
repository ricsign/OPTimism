import React, { useState, useEffect, useContext } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { message } from "antd";
import EyeBall from "../EyeBall/EyeBall";
import "./EyeExercises.css";

import UserContext from "../../context/userContext";

// eslint-disable-next-line react/prop-types
function EyeExercises({ onComplete }) {
  const { user, setUser } = useContext(UserContext);

  const handleComplete = async () => {
    if (onComplete) {
      onComplete();
    } else {
      const userRef = doc(db, "users", user.uid);
      const userData = await getDoc(userRef);
      const currentHealthScore = userData?.data()?.userMetadata?.healthScore || 50;
      const currentOptimismCredit = userData?.data()?.optimismCredit || 0;

      let newHealthScore = currentHealthScore + Math.floor(0.1 * (100 - currentHealthScore));
      if (newHealthScore > 100) newHealthScore = 100;

      const newOptimismCredit = currentOptimismCredit + 2;

      await updateDoc(userRef, {
        optimismCredit: newOptimismCredit,
        userMetadata: {
          healthScore: newHealthScore,
        },
      });

      const updatedUser = {
        ...user,
        optimismCredit: newOptimismCredit,
        userMetadata: {
          healthScore: newHealthScore,
        },
      };
      setUser(updatedUser); // Assuming setUser function exists
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Congratulations! This exercise has been completeed and you have earned 2 optimism credits!");
    }

    window.location.href = '/home';
  };


  const positions = [
    { top: "30px", left: "30px" }, // Top-left
    {
      top: `${Math.floor(Math.random() * 100)}vh`,
      left: `${Math.floor(Math.random() * 100)}vw`,
    }, // Random
    { top: "calc(100vh - 150px)", left: "calc(100vw - 60px)" }, // Bottom-right
    {
      top: `${Math.floor(Math.random() * 100)}vh`,
      left: `${Math.floor(Math.random() * 100)}vw`,
    }, // Random
    { top: "30px", left: "calc(100vw - 60px)" }, // Top-right
    {
      top: `${Math.floor(Math.random() * 100)}vh`,
      left: `${Math.floor(Math.random() * 100)}vw`,
    }, // Random
    { top: "calc(100vh - 60px)", left: "30px" }, // Bottom-left
  ];

  const [displayText, setDisplayText] = useState("3");
  const [showCircle, setShowCircle] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ top: "30px", left: "30px" });
  const [clickCount, setClickCount] = useState(0);
  const [textOptions, setTextOptions] = useState([
    "Now rotate your neck counterclockwise",
    "Now rotate your neck the other way (clockwise)",
    "Now look up and down",
    "Now close your eyes and count to 3",
    "",
    "You've completed your eye exercises!",
  ]);
  const [showEyeBall, setShowEyeBall] = useState(false); // State to track EyeBall display

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

  useEffect(() => {
    if (clickCount === positions.length + 4) {
      setShowEyeBall(true); // Show EyeBall component
      const timeout = setTimeout(() => {
        setShowEyeBall(false);
        setClickCount((prevClickCount) => prevClickCount + 1); // Increment clickCount
        // Hide EyeBall component after 3 seconds
        setTimeout(() => {
          handleComplete();
        }, 2000);
      }, 3000); 
      return () => clearTimeout(timeout);
    }
  }, [clickCount]);

  const handleCircleClick = () => {
    if (showCircle) {
      setClickCount((prevClickCount) => prevClickCount + 1); // Increment clickCount

      const newPosition = positions[(clickCount + 1) % positions.length];
      setCirclePosition(newPosition); // Update circlePosition
    }
  };

  const blackScreenStyles = {
    width: "100vw",
    height: "100vh",
    top: 0,
    background: showEyeBall ? "linear-gradient(-45deg, #8691b3, #edeef3)" : "black",
   
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
    background:
      "radial-gradient(circle at 60% 40%, #ffffff, #ddd, transparent), radial-gradient(circle at 40% 60%, #ffffff88, #aaa, transparent)",
    boxShadow:
      "0 0 25px 15px rgba(255,255,255,0.6), 0 0 40px 20px rgba(255,255,255,0.4), 0 0 55px 25px rgba(255,255,255,0.2)",
    position: "absolute",
    top: circlePosition.top,
    left: circlePosition.left,
    cursor: "pointer",
    animation: "pulse 2s infinite, rotate 50s infinite",
    transition: "all 0.4s ease-in-out",
  };

  const handleBlackScreenClick = () => {
    setClickCount((prevClickCount) => prevClickCount + 1);

    // console.log('clickcount', clickCount);
    // console.log('complete count', positions.length + 4)
    // console.log('clickCount - positions.length', clickCount - positions.length);
    // if (clickCount - positions.length === 4) {
    //   onComplete();
     
    // }
  };

  return (
    <div style={blackScreenStyles}>
      {!showCircle ? displayText : ""}
      {/* debug use only */}
      {/* <p style={{ color: "white", fontSize: "24px" }}>{clickCount}</p> */}

      {clickCount >= positions.length ? (
        <div style={{ textAlign: "center" }} onClick={handleBlackScreenClick}>
          {showEyeBall ? (
            <EyeBall /> // Display EyeBall component when showEyeBall is true
          ) : (
            <p style={{ color: "white", fontSize: "24px" }}>
              {textOptions[clickCount - positions.length]}
            </p>
          )}
        </div>
      ) : showCircle ? (
        <div style={whiteCircleStyles} onClick={handleCircleClick}></div>
      ) : null}
    </div>
  );
}

export default EyeExercises;
