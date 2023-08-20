import React, { useContext, useEffect } from "react";
import { auth } from "../../utils/firebaseConfig";
import { signOut } from "firebase/auth";
import UserContext from "../../context/userContext";

function Logout() {
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      setUser(null); // Clear the user from context
      localStorage.removeItem("user"); // Remove user from localStorage
      window.location.href = "/"; // Redirect to home (or login) page
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  useEffect(() => {
    if (confirm("Are you sure you want to log out?")) {
      handleLogout();
    }
  }, []);

  return <div>Logout</div>;
}

export default Logout;
