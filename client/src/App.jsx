import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import UserProvider from "./context/userProvider";

import HomePage from "./components/HomePage/HomePage";
import EyeExercises from "./components/EyeExercises/EyeExercises";
import Login from "./components/Login/Login";
import LoggedRoute from "./routes/LoggedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute component={Login} />} />
          <Route path="/home" element={<LoggedRoute component={HomePage} />} />
          <Route path="/eye-exercises" element={<LoggedRoute component={EyeExercises} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
