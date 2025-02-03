import axios from "axios";
import loginService from "../services/login";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["authorization"] = `bearer ${user.token}`;
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.error(exception);
      setMessage("Incorrect username or password");
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      axios.defaults.headers.common["authorization"] = `bearer ${user.token}`;
    }
  }, [setUser]);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
  };

  return (
    <div>
      <h2>Log in to application</h2>
      {message && <h2 style={{ color: "red" }}>{message}</h2>}
      <form onSubmit={handleLogin}>
        <label>username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        <label>password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );
};
export default LoginForm;
