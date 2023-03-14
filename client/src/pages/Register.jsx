import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleInput = (e) => {
    setError(null);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitRegister = async (e) => {
    // handle button refresh
    e.preventDefault();

    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="auth">
      <h1>Register New Account</h1>
      <form action="">
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleInput}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleInput}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleInput}
        />
        <button onClick={handleSubmitRegister}>Register New Account</button>
        {err && <p>{err}</p>}
        <span>
          Do you have account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
