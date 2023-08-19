import React, { useState, useEffect } from 'react';

function EyeExercises() {
  const [displayText, setDisplayText] = useState('3');
  const [showCircle, setShowCircle] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ top: 0, left: 0 });
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (displayText === '0') {
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
      const positions = [
        { top: '0', left: '0' },         // Top-left
        { top: 'calc(100vh - 50px)', left: 'calc(100vw - 50px)' }, // Bottom-right
        { top: '0', left: 'calc(100vw - 50px)' },                  // Top-right
        { top: 'calc(100vh - 50px)', left: '0' },                  // Bottom-left
      ];

      const newPosition = positions[(clickCount + 1) % positions.length];
      setCirclePosition(newPosition);
      setClickCount((prevClickCount) => prevClickCount + 1);
    }
  };

  const blackScreenStyles = {
    width: '100vw',
    height: '100vh',
    top: 0,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '24px',
    position: 'relative',
  };

  const whiteCircleStyles = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'white',
    position: 'absolute',
    top: circlePosition.top,
    left: circlePosition.left,
    cursor: 'pointer',
  };

  return (
    <div style={blackScreenStyles}>
      {!showCircle ? displayText : ''}
      {showCircle && (
        <div style={whiteCircleStyles} onClick={handleCircleClick}></div>
      )}
    </div>
  );
}

export default EyeExercises;
