import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./utils/firebaseConfig";
import { signOut } from "firebase/auth";
import "./App.css";

import UserProvider from "./context/userProvider";
import UserContext from "./context/userContext";

import HomePage from "./components/HomePage/HomePage";
import EyeExercises from "./components/EyeExercises/EyeExercises";
import BubbleBtn from "./components/BubbleBtn/BubbleBtn";
import EyeBall from "./components/EyeBall/EyeBall";
import Login from "./components/Login/Login";
import Leaderboard from "./components/Leaderboard/Leaderboard";

import LoggedRoute from "./routes/LoggedRoute";
import PublicRoute from "./routes/PublicRoute";
import Redemption from "./components/Redemption/Redemption";

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
          <Route
            path="/eye-exercises"
            element={<LoggedRoute component={EyeExercises} />}
          />

          <Route
            path="/leaderboard"
            element={<LoggedRoute component={Leaderboard} />}
          />
          <Route
            path="/redeem"
            element={<LoggedRoute component={Redemption} />}
          />

          <Route
            path="logout"
            element={
              <>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            }
          />
        </Routes>
      </Router>

      <nav>
        <div className="menu">
          <p className="website_name">OPTimism</p>
          <div className="menu_links">
            <a href="/analytics" className="link">
              Analytics
            </a>
            <a href="/leaderboard" className="link">
              Leaderboard
            </a>
            <a href="/redeem" className="link">
              Rewards
            </a>
            <a href="/dontate" className="link">
              Donate
            </a>
            <a href="/logout" className="link">
              Log Out
            </a>
          </div>
          <div className="menu_icon" id="menuIcon">
            <span className="icon"></span>
          </div>
        </div>
      </nav>
    </UserProvider>
  );
}

export default App;
