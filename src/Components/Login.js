import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds({ ...creds, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/api/login", creds);
      const token = res.data.token;
      localStorage.setItem("token", token);
      onLogin(creds.username);
      navigate("/friends");
    } catch (error) {
      console.error(error);
      setErrorMessage("Authentication failed. Please check your credentials.");
    }
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <h1>LOGIN.</h1>
      <div>
        <label htmlFor="username">USERNAME </label>
        <br />
        <input
          onChange={handleChange}
          name="username"
          type="id"
          placeholder="Username Required.."
        />
      </div>
      <div>
        <label htmlFor="password">PASSWORD </label>
        <br />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password Required.."
        />
      </div>
      <button type="submit">Submit</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
export default Login;
