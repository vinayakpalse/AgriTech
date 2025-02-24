import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Schemes from "./pages/Schemes";
import Market from "./pages/Market";
import Weather from "./pages/Weather";
import Community from "./pages/Community";
import Training from "./pages/Training";
import Login from "./components/Login"; // Import the Login page
import Register from "./components/Register";
import Profile from "./pages/Profile";
import NewsPage from "./pages/NewsPage";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <Routes>
        {/* Set Login as the default page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/market" element={<Market />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/community" element={<Community />} />
        <Route path="/training" element={<Training />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
