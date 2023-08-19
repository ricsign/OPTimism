import React from "react";
import DonationForm from '../DonationPage/DonationForm';
import HelpUs from '../DonationPage/HelpUs';
import classes from '../DonationPage/DonationPage.module.css'

function DonationPage() {

  const useState = React.useState;
  const useEffect = React.useEffect;
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    fetchCircleAPI();
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);



  const fetchCircleAPI = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    };

    fetch('https://api.circle.com/ping', options)
      .then(response => response.json())
      .then(data => setApiResponse(data))
      .catch(error => console.error(error));
  };

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 600);
  };

  return (
<div className="donation-wrapper">
{/* {apiResponse && (
        JSON.stringify(apiResponse, null, 2)
      )} */}
      {apiResponse ? (
        <main className={classes.DonationPage}>
        {!isSmallScreen && <HelpUs />}
        <DonationForm />
      </main>
      ) : null} </div>
    
  );
}

export default DonationPage;
