import React, { useState } from "react";
// import "./DonationPage.css";
import DonationForm from '../DonationPage/DonationForm';
import HelpUs from '../DonationPage/HelpUs';
import classes from '../DonationPage/DonationPage.module.css'

function DonationPage() {
//   const [amount, setAmount] = useState("");

//   const [currentCount, setCurrentCount] = useState(1);
//   const subtotal = 5;

//   const handlePlus = () => {
//     setCurrentCount(currentCount + 1);
//   };

//   const handleMinus = () => {
//     if (currentCount > 1) {
//       setCurrentCount(currentCount - 1);
//     }
//   };

  return (

    // <div className="donation-form">
    //   <div className="progress-bg">
    //     <div className="progress-bar">
    //       <h3 className="raised">$50,000&nbsp;raised </h3>
    //     </div>

    //     <h3 className="goal">Goal: $100,000</h3>
    //   </div>

      
    // </div>

    <main className={classes.DonationPage}>
      <HelpUs />
      <DonationForm />
    </main>
    
  );
}

export default DonationPage;
