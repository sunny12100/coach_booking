import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {!user ? (
          <Route path="/" element={<AuthPage setUser={setUser} />} />
        ) : (
          <Route path="/" element={<MainPage user={user} />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
