import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import HomePage from "./components/HomePage/HomePage";
import EyeExercises from "./components/EyeExercises/EyeExercises";
import Login from "./components/Login/Login";


function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/eye-exercises" element={<EyeExercises />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
