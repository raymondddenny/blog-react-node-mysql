import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { signin } = useContext(AuthContext);

  const handleInput = (e) => {
    setError(null);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitSignin = async (e) => {
    // handle button refresh
    e.preventDefault();

    try {
      await signin(inputs);
      navigate("/");
    } catch (error) {
      console.log(error);
      // setError(error.response.data.message);
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form action="">
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleInput}
        />
        <button onClick={handleSubmitSignin}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
