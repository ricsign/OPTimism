import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import UserProvider from "./context/userProvider";

import HomePage from "./components/HomePage/HomePage";
import EyeExercises from "./components/EyeExercises/EyeExercises";
import Login from "./components/Login/Login";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/eye-exercises" element={<EyeExercises />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
