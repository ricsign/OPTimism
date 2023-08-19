import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./utils/firebaseConfig";
import { signOut } from "firebase/auth";
import "./App.css";

import UserProvider from "./context/userProvider";
import UserContext from "./context/userContext";

import HomePage from "./components/HomePage/HomePage";
import EyeExercises from "./components/EyeExercises/EyeExercises";
import BubbleBtn from './components/BubbleBtn/BubbleBtn';
import EyeBall from './components/EyeBall/EyeBall';
import Login from "./components/Login/Login";
import Leaderboard from "./components/Leaderboard/Leaderboard";

import LoggedRoute from "./routes/LoggedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
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

  return (
    <UserProvider>
      <Router>
        <Routes>
      <Route path="/button-test" element={<BubbleBtn />} /> 
   
          <Route path="/" element={<PublicRoute component={Login} />} />
          <Route path="/home" element={<LoggedRoute component={HomePage} />} />

          <Route path="/eye-ball" element={<EyeBall />} />
          <Route path="/eye-exercises" element={<LoggedRoute component={EyeExercises} />} />
         {/* delete later */}
             </Routes>
          <Route
            path="/leaderboard"
            element={<LoggedRoute component={Leaderboard} />}
          />

          <Route
            path="logout"
            element={
              <>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
                  Logout
                </button>
              </>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
