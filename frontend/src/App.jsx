import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WelcomePage from "./pages/WelcomePage";
import MyProfile from "./pages/MyProfile";
import SignUp from "./pages/SignUp";
import Startups from "./pages/Startups";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/startups" element={<Startups />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
