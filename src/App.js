import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Login from "./Components/Login";
import AddFriend from "./Components/AddFriend";
import FriendsList from "./Components/FriendsList";

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token && storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername("");
    navigate("/login");
  };

  const onLogin = (user) => {
    setUsername(user);
  };

  return (
    <div className="App">
      <header>
        <h1>FRIENDS DATABASE.</h1>
        {username ? (
          <>
            <p>Welcome, {username}!</p>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate("/friends/add")}>ADDFRIEND</button>
            <button onClick={() => navigate("/friends")}>FRIENDSLIST</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>LOGIN</button>
          </>
        )}
      </header>

      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login onLogin={onLogin} />} />
        <Route exact path="/friends" element={<FriendsList />} />
        <Route exact path="/friends/add" element={<AddFriend />} />
      </Routes>
    </div>
  );
}

export default App;

