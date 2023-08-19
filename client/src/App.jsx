import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import HomePage from "./components/HomePage/HomePage";
import EyeExercises from "./components/EyeExercises/EyeExercises";
import BubbleBtn from './components/BubbleBtn/BubbleBtn';
import EyeBall from './components/EyeBall/EyeBall';


function App() {
  return (
    <>
      <Router>
      <Routes>
      <Route path="/button-test" element={<BubbleBtn />} /> 
   
        <Route path="/" element={<HomePage />} />
        <Route path="/eye-ball" element={<EyeBall />} />
        <Route path="/eye-exercises" element={<EyeExercises />} />
         {/* delete later */}
           </Routes>
    </Router>
    </>
  );
}

export default App;
