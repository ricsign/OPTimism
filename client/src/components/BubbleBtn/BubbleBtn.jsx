import React, { useEffect } from 'react';
import './BubbleBtn.css'; 

function BubbleBtn() {
  useEffect(() => {
    const squareElements = document.getElementsByClassName('square');

    const handleMouseEnter = function () {
      this.classList.add('rubberBand');
      this.addEventListener('animationend', function () {
        this.classList.remove('rubberBand');
      }, false);
    };

    for (let i = 0; i < squareElements.length; i++) {
      squareElements[i].addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      for (let i = 0; i < squareElements.length; i++) {
        squareElements[i].removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="under-container bubble">
        <div className="line">
          <div className="square" id="square">Login</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
      </div>
    </div>
  );
}

export default BubbleBtn;
